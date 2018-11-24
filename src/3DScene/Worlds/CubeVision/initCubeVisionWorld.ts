import { World } from '../../Base/World';
import { Camera } from '../../Base/Camera';
import { Plane } from '../../WorldObjects/Plane';
import { Grid } from '../../WorldObjects/Grid';
import { Cube } from '../../WorldObjects/Cube';

export function initCubeVisionWorld() {
    return new World(
        [
            new Grid(5),
            new Cube((211 / 255), (84 / 255), 0),
            new Plane(),
            // new Triangle()
        ],
        [
            new Camera(
                {x:5, y: 3, z: 1},
                {x: 0, y: 1, z: 0},
                window.innerWidth / window.innerHeight
            )
        ]
    )
}