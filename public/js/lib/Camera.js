import { Vector3D, Vector2D } from "./Vector";

class Camera {
    constructor(x, y, z, focal_length = 200) {
        this.position = new Vector3D(x, y, z);
        this.rotation = new Vector2D(0, 0, 0);
        this.velocity = new Vector3D(0, 0, 0);
        this.focal_length = focal_length;
    }

    compute_x = (vector, z) => {
        if (!vector.z) return vector.x;
        return Math.round((z * (vector.x / vector.z)) * 10) / 10;
    }

    compute_y = (vector, z) => {
        if (!vector.z) return vector.y;
        return Math.round((z * (vector.y / vector.z)) * 10) / 10;
    }

    compute_radian = (deg) => {
        return deg * (Math.PI / 180);
    }

    depth_clip = (vectors) => {
        let n_v = [];
        
        for (let i = 0; i < vectors.length; i++) {
            
            let vector = vectors[i];
            let next = (i != vectors.length - 1) ? vectors[i+1] : vectors[0];
            let prev = (i != 0) ? vectors[i-1] : vectors[vectors.length-1];

            let [ xn, yn, zn ] = [
                next.x - this.position.x,
                next.y - this.position.y, 
                next.z - this.position.z,
            ];

            let [ xp, yp, zp ] = [
                prev.x - this.position.x,
                prev.y - this.position.y,
                prev.z - this.position.z,
            ];

            let [ x, y, z ] = [
                vector.x - this.position.x,
                vector.y - this.position.y,
                vector.z - this.position.z,
            ];

            let lines = [
                new Vector3D(Math.abs(x - xn), Math.abs(y - yn), Math.abs(z - zn)),
                new Vector3D(Math.abs(x - xp), Math.abs(y - yp), Math.abs(z - zp)),
            ];

            if (z < 0) {
                let fx = this.compute_x(lines[0], Math.abs(z)) * ((xn > x) ? 1 : -1);
                let sx = this.compute_x(lines[1], Math.abs(z)) * ((xp > x) ? 1 : -1);

                let fy = this.compute_y(lines[0], Math.abs(z)) * ((yn > y) ? 1 : -1);
                let sy = this.compute_y(lines[1], Math.abs(z)) * ((yp > y) ? 1 : -1);

                if (zn >= 0 && zp >= 0) {
                    n_v = [...n_v,
                        new Vector3D(vector.x + sx, vector.y + sy, vector.z + Math.abs(z)),
                        new Vector3D(vector.x + fx, vector.y + fy, vector.z + Math.abs(z)),
                    ];
                } else if (zn >= 0 || zp >= 0) {
                    n_v = [...n_v, new Vector3D(
                                    vector.x + ((zn >= 0) ? fx : sx), 
                                    vector.y + ((zn >= 0) ? fy : sy), 
                                    vector.z + Math.abs(z),
                                )];
                }
            } else {
                n_v = [...n_v, vector];
            }
            
        }
        return n_v;
    }

    project = (vectors, w, h) => {
        let project2D = [];

        let v = this.rotateX(this.rotateY(vectors));
        v = this.depth_clip(v);

        let fov = this.compute_radian(70 * 0.5);
        let near = 0.2;
        let far = 1000;
        let projection_matrix = [(h / w) * (1 / Math.tan(fov)),
                                    1 / Math.tan(fov),
                                    far / (far - near),
                                    (-far * near) / (far - near)];

        

        for (let i = 0; i < v.length; i++) {
            let vector = v[i];

            let p = new Vector3D(
                (vector.x - this.position.x) * projection_matrix[0],
                (vector.y - this.position.y) * projection_matrix[1],
                ((vector.z - this.position.z) * projection_matrix[2]) + ((vector.z - this.position.z) * projection_matrix[3]),
                (vector.z - this.position.z),
            );


            if (p.w != 0) {
                p.x /= p.w;
                p.y /= p.w;
                p.z /= p.w;
            }

            
    
            let x = (p.x + 1) * 0.5 * w;
            let y = (p.y + 1) * 0.5 * h;

            project2D = [...project2D, new Vector3D(x, y, p.z, p.w)];
            
        }

        return project2D;
    }

    rotateY = (vectors) => {
        let b = Array(vectors);

        for (let i = 0; i < vectors.length; i++) {
            let v = vectors[i];

            let x = (v.x - this.position.x) * Math.cos(this.rotation.y) + (v.z - this.position.z) * Math.sin(this.rotation.y);
            let z = (v.z - this.position.z) * Math.cos(this.rotation.y) - (v.x - this.position.x) * Math.sin(this.rotation.y);


            b[i] = new Vector3D(x + this.position.x, v.y, z + this.position.z);
        }

        return b;
    }

    rotateX = (vectors) => {
        let b = Array(vectors);

        for (let i = 0; i < vectors.length; i++) {
            let v = vectors[i];

            let y = (v.y - this.position.y) * Math.cos(this.rotation.x) - (v.z - this.position.z) * Math.sin(this.rotation.x);
            let z = (v.z - this.position.z) * Math.cos(this.rotation.x) + (v.y - this.position.y) * Math.sin(this.rotation.x);

            b[i] = new Vector3D(v.x, y + this.position.y, z + this.position.z);
        }

        return b;
    }

    is_collide = (blocks, x, y, z) => {
        let y_pos = Math.round(y);

        let b = blocks.slice().find((v) => {
            return ((v.x <= x + 15 && v.x + 50 >= x - 15) && (v.z <= z + 15 && v.z + 50 >= z - 15))
                && ((v.y < (y_pos + 90) && v.y > y_pos) || ((v.y + 40) < (y_pos + 90) && (v.y + 40) > y_pos));
        });

        return (b) ? b : false;
    }

    update_position = (blocks, width, height) => {
        let r = this.rotateY([new Vector3D(this.position.x, 0, this.position.z + 100)]);
        let vector = r[0];

        let vz = vector.z - this.position.z;
        let m = (this.focal_length / vz) || 50;

        let n = { ...r[0], x: r[0].x - this.position.x, z: (r[0].z - this.position.z) };

        r[0].x = -(vector.x - this.position.x) * Math.abs(m) + (width * 0.5);
        r[0].y = (vector.y - this.position.y) * Math.abs(m) + (height * 0.5);

        let prop_z = n.z / 100;
        let prop_x = -n.x / 100;


        let [n_cam_zz, n_cam_xx, n_cam_zx, n_cam_xz] = [this.velocity.z * (prop_z),
        -this.velocity.x * (prop_x),
        this.velocity.z * (prop_x),
        this.velocity.x * (prop_z)];
        let v_x = n_cam_zx + n_cam_xz;
        let v_z = n_cam_zz + n_cam_xx;

        let z_col = this.is_collide(blocks, this.position.x, this.position.y, this.position.z + v_z);

        let x_col = this.is_collide(blocks, this.position.x + v_x, this.position.y, this.position.z);

        this.position.z += (!z_col) ? v_z : 0;
        this.position.x += (!x_col) ? v_x : 0;


        let bottom = this.is_collide(blocks, this.position.x, this.position.y + this.velocity.y + 1, this.position.z);

        if (bottom && this.velocity.y >= 0) this.velocity.y = 0;
        else this.velocity.y += (this.velocity.y < 50) ? 2 : 0;


        if (!bottom) {
            this.position.y += this.velocity.y;
        } else {
            if (this.velocity.y == 0) this.position.y = bottom.y - 90;
            else this.velocity.y = 2;
        }
    }
}

export default Camera;