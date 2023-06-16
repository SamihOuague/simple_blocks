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

    compute_y = (vector, x) => {
        if (!vector.x) return vector.y;
        return Math.round((x * (vector.y / vector.x)) * 10) / 10;
    }

    vector_clip = (vectors) => {
        let new_vectors = [];
        for (let i = 0; i < vectors.length; i++) {
            let p1;
            let p2;

            if (i == 0) {
                p1 = vectors[vectors.length - 1];
                p2 = vectors[i + 1];
            } else if (i == (vectors.length - 1)) {
                p1 = vectors[i - 1];
                p2 = vectors[0];
            } else {
                p1 = vectors[i - 1];
                p2 = vectors[i + 1];
            }

            let line = [
                new Vector3D(Math.abs(vectors[i].x - p1.x), Math.abs(vectors[i].y - p1.y), Math.abs(vectors[i].z - p1.z)),
                new Vector3D(Math.abs(vectors[i].x - p2.x), Math.abs(vectors[i].y - p2.y), Math.abs(vectors[i].z - p2.z)),
            ];

            let n_x = this.compute_x(line[0], Math.abs(vectors[i].z - this.position.z)) ;
            let n2_x = this.compute_x(line[1], Math.abs(vectors[i].z - this.position.z));
            
            //let n_y = this.compute_y(line[0], Math.abs(vectors[i].x + n_x)) * ((vectors[i].x + n_x < p1.x) ? 1 : -1);
            //let n2_y = this.compute_y(line[1], Math.abs(vectors[i].x + n2_x)) * ((vectors[i].x + n2_x < p2.x) ? 1 : -1);

            if (vectors[i].z < this.position.z) {
                if (p1.z > this.position.z && p2.z > this.position.z) {
                    new_vectors = [...new_vectors, 
                        new Vector3D(vectors[i].x + n_x, vectors[i].y, this.position.z),
                        new Vector3D(vectors[i].x + n2_x, vectors[i].y, this.position.z),
                    ];
                } else if (p1.z > this.position.z || p2.z > this.position.z) {
                    new_vectors = [...new_vectors, {...vectors[i], z: this.position.z}];
                }
            } else {
                new_vectors = [...new_vectors, vectors[i]];
            }
        }
        return new_vectors;
    }

    project = (vectors, w, h) => {
        let project2D = [];
        
        let focal_length = this.focal_length;
        
        let v = vectors.slice();
        
        for (let i = 0; i < v.length; i++) {
            let vector = v[i];
            
            let vz = (vector.z - this.position.z) || 1;
            let m = (focal_length / vz);
            
            let x = (vector.x - this.position.x) * m + w;
            let y = (vector.y - this.position.y) * m + h;

            project2D = [...project2D, new Vector2D(x, y)];
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
        else this.velocity.y += (this.velocity.y < 50) ? 2 : 0;

        

        if (!bottom) {
            this.position.y += this.velocity.y;
        } else {
            if (this.velocity.y == 0) this.position.y = bottom.y - 90;
            else this.velocity.y = 2;
        }
    }
    
    clipping_x = (vectors) => {
        let n_v = [];
        let line;

        for (let i = 0; i < vectors.length; i++) {
            let p1;
            let p2;

            if (i == 0) {
                p1 = vectors[vectors.length - 1];
                p2 = vectors[i + 1];
            } else if (i == (vectors.length - 1)) {
                p1 = vectors[i - 1];
                p2 = vectors[0];
            } else {
                p1 = vectors[i - 1];
                p2 = vectors[i + 1];
            }

            line = [
                new Vector2D(Math.abs(vectors[i].x - p1.x), Math.abs(vectors[i].y - p1.y)),
                new Vector2D(Math.abs(vectors[i].x - p2.x), Math.abs(vectors[i].y - p2.y)),
            ];

            if (vectors[i].x < 0) {
                let n_y = this.compute_y(line[0], Math.abs(vectors[i].x)) * ((vectors[i].y < p1.y) ? 1 : -1);
                let n2_y = this.compute_y(line[1], Math.abs(vectors[i].x)) * ((vectors[i].y < p2.y) ? 1 : -1);
                if (p1.x > 0 && p2.x > 0) {
                    n_v = [...n_v,
                        new Vector2D(0, vectors[i].y + n_y),
                        new Vector2D(0, vectors[i].y + n2_y),
                    ];
                } else if (p1.x > 0 || p2.x > 0) {
                    n_v = [...n_v,
                        new Vector2D(0, vectors[i].y + ((p1.x > 0) ? n_y : n2_y)),
                    ];
                }

            } else if (vectors[i].x > this.width) {
                let n_y = this.compute_y(line[0], this.width - vectors[i].x) * ((vectors[i].y > p1.y) ? 1 : -1);
                let n2_y = this.compute_y(line[1], this.width - vectors[i].x) * ((vectors[i].y > p2.y) ? 1 : -1);

                if (p1.x < this.width && p2.x < this.width) {
                    n_v = [...n_v, 
                        new Vector2D(this.width, vectors[i].y + n_y),
                        new Vector2D(this.width, vectors[i].y + n2_y),
                    ];
                } else if (p1.x <= this.width || p2.x <= this.width) {
                    n_v = [...n_v, 
                        new Vector2D(this.width, vectors[i].y + ((p1.x < this.width) ? n_y : n2_y)),
                    ];
                }
            } else {
                n_v.push(vectors[i]);
            }
        }

        return n_v;
    }

    
    clipping_y = (vectors) => {
        let n_v = [];
        let line;

        for (let i = 0; i < vectors.length; i++) {
            let p1;
            let p2;
            if (i == 0) {
                p1 = vectors[vectors.length - 1];
                p2 = vectors[i + 1];
            } else if (i == (vectors.length - 1)) {
                p1 = vectors[i - 1];
                p2 = vectors[0];
            } else {
                p1 = vectors[i - 1];
                p2 = vectors[i + 1];
            }
            line = [
                new Vector2D(Math.abs(vectors[i].x - p1.x), Math.abs(vectors[i].y - p1.y)),
                new Vector2D(Math.abs(vectors[i].x - p2.x), Math.abs(vectors[i].y - p2.y)),
            ];
            if (vectors[i].y < 0) {
                let n_x = this.compute_x(line[0], Math.abs(vectors[i].y)) * ((vectors[i].x < p1.x) ? 1 : -1);
                let n2_x = this.compute_x(line[1], Math.abs(vectors[i].y)) * ((vectors[i].x < p2.x) ? 1 : -1);

                if (p1.y > 0 && p2.y > 0) {
                    n_v = [...n_v,
                        new Vector2D(vectors[i].x + n_x, 0),
                        new Vector2D(vectors[i].x + n2_x, 0),
                    ];
                } else if (p1.x > 0 || p2.x > 0) {
                    n_v = [...n_v,
                        new Vector2D(vectors[i].x + ((p1.y > 0) ? n_x : n2_x), 0),
                    ];
                }

            } else if (vectors[i].y > this.height) {
                let n_x = this.compute_x(line[0], this.height - vectors[i].y) * ((vectors[i].x > p1.x) ? 1 : -1);
                let n2_x = this.compute_x(line[1], this.height - vectors[i].y) * ((vectors[i].x > p2.x) ? 1 : -1);

                if (p1.y < this.height && p2.y < this.height) {
                    n_v = [...n_v, 
                        new Vector2D(vectors[i].x + n_x , this.height),
                        new Vector2D(vectors[i].x + n2_x, this.height),
                    ];
                } else if (p1.y < this.height || p2.y < this.height) {
                    n_v = [...n_v, 
                        new Vector2D(vectors[i].x + ((p1.y < this.height) ? n_x : n2_x), this.height),
                    ];
                }
            } else {
                n_v.push(vectors[i]);
            }
        }

        return n_v;
    }
}

export default Camera;