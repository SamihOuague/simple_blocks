# Simple Block (Final project)
#### Video Demo: `https://www.youtube.com/watch?v=8Rz7maeyzmc`
#### Description
'Simple Block' is a simple game made with JavaScript that allows you to add colorful cubes into a 3D space. The project handles its own 3D graphics library and some basic physics like collisions & velocity.

##### Scene & Render
`class Scene` handles useful methods to render 2D projection of a 3D space, the constructor method takes a width, height and '2D' context as argument :

```
import Scene from "./lib/Scene";

let canvas = document.getElementsByName("canvas");
let context = canvas.getContext("2d");

# Document width and height
let [ clientWidth, clientHeight ] = document.documentElement;

let scene = new Scene(clientWidth, clientHeight, context);
scene.render();
```

`Scene` has a property `this.blocks = [ new Block(x, y, z, size) ]` that keeps all of the cubes present into the 3D space and are rendered into 2D projection using `scene.render()`.

##### Perspective Camera & Projection
`scene.camera` is a instance of `class Camera` which has informations about camera's orientation, velocity and position into the 3D space.
```
class Camera {
    constructor(x, y, z) {
        this.position = new Vector3D(x, y, z);
        this.rotation = new Vector2D(0, 0, 0);
        this.velocity = new Vector3D(0, 0, 0);
    }
}
scene.camera = new Camera(x, y, z);
```
Using those information, `camera.project(vectors, width, height)` method can calculate 3d objects vectors and return a perspective projection in 2d space.
`camera.project` does matrices multiplications and depth clipping before returning transformed vectors.

##### Rotation
`camera.rotation = {x, y}` represent the x and y 3D space's rotations around the camera (The camera is the origin), and takes only radian (`degrees * (Math.PI/180)`) as properties.
Those radian will be used by `camera.rotateX(camera.rotateY(vectors)) : vectors` methods just before the projection to figure out where the camera is looking, and use the rotation matrix to compute the new position of the blocks.

##### Velocity & Collision 
`camera.velocity = {x, y, z}` represent the movement of the camera into the 3D space, `camera.update_position` method computes the camera's pointing direction using `camera.rotation` to get the direction of the new position in each frame.
Before update `camera.position`, a method (`camera.is_collide(blocks)`) is called to check if any collision is there. 
