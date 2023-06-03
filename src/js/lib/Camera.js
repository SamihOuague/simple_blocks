import { Vector3D, Vector2D } from "./Vector";

class Camera {
    constructor(x, y, z, focal_length = 200) {
        this.position = new Vector3D(x, y, z);
        this.rotation = new Vector2D(0, 0, 0);
        this.velocity = new Vector3D(0, 0, 0);
        this.focal_length = focal_length;
    }

    project = (vectors, w, h) => {
        let project2D = Array(vectors.length);
        
        let focal_length = this.focal_length;
        
        let v = vectors.slice().map((v) => {
            if (v.z < this.position.z) {
                return {...v,
                    z: this.position.z
                }
            } else return v;
        });
        
        for (let i = 0; i < vectors.length; i++) {
            let vector = v[i];

            let vz = vector.z - this.position.z || 1;
            let m = (focal_length / vz);
            
            let x = (vector.x - this.position.x) * m + w;
            let y = (vector.y - this.position.y) * m + h;

            project2D[i] = new Vector2D(x, y);
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
        let x_pos = Math.round((x) - (x % 50));
        let z_pos = Math.round((z) - (z % 50));
        let y_pos = Math.round(y);
        
        let b = blocks.slice().find((v) => {
            return (v.x == x_pos && v.z == z_pos) && (v.y < (y_pos + 90) && v.y > y_pos);
        });

        return (b) ? b : false;
    }

    update_position = (blocks, width, height) => {
        let r = this.rotateY([new Vector3D(this.position.x, 0, this.position.z + 100)]);
        let vector = r[0];
        
        let vz = vector.z - this.position.z;
        let m = (this.focal_length / vz) || 50;

        let n = {...r[0], x: r[0].x - this.position.x, z: (r[0].z - this.position.z)};

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

        this.position.z += (!z_col) ? v_z: 0;
        this.position.x += (!x_col) ? v_x: 0;


        let bottom = this.is_collide(blocks, this.position.x, this.position.y + this.velocity.y + 1, this.position.z);

        if (bottom && this.velocity.y >= 0) this.velocity.y = 0;
        else this.velocity.y += (this.velocity.y < 100) ? 2 : 0;

        

        if (bottom) {
            this.position.y = bottom.y - 90;
        } else {
            this.position.y += this.velocity.y;
        }
    }
}

export default Camera;