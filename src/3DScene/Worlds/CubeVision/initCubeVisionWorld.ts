import { World } from '../../Base/World';
import { Camera } from '../../Base/Camera';
import { Plane } from '../../WorldObjects/Plane';
import { Grid } from '../../WorldObjects/Grid';
import { Cube } from '../../WorldObjects/Cube';

export function initCubeVisionWorld() {
    return new World(
        [
            new Grid(25),
            new Cube((211 / 255), (84 / 255), 0),
            new Plane()
        ],
        [
            new Camera(
                new Float32Array([0, 5, 0]),
                new Float32Array([0, 1, 0]),
                 window.innerWidth / window.innerHeight
            )
        ]
    )
}