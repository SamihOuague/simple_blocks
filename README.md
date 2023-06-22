# Simple Block (Final project)
#### Video Demo: `Coming Soon`
#### Description
'Simple Block' is a simple game made with JavaScript that allows you to add colorful cubes into a 3D space.
The project handles its own 3D graphics librairy and some basic physics like collisions & velocity.

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
Using those informations, `camera.project(vectors, width, height)` method can calculate 3d objects vectors and return a perspective projection in 2d space.
`camera.project` do matrices multiplications and depth clipping before return a transformed vectors.

##### Rotation
`camera.rotation = {x, y}` has to be an `Object` representing the x and y 3D space's rotation around the camera (The camera is the origin), and takes only gradians (`degrees * (Math.PI/180)`) as properties.
Those gradians will be used by `camera.rotateX(camera.rotateY(vectors)) : vectors` methods just before the projection to figure out where the camera is looking, and use rotation matrix to compute the new position of the blocks.

##### Velocity & Collision 


