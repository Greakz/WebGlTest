import { World } from '../../Base/World';
import { Camera } from '../../Base/Camera';
import { Cube } from '../../WorldObjects/Cube';
import { WorldObject } from '../../Base/WorldObject';
import { Grid } from '../../WorldObjects/Grid';
import { Plane } from '../../WorldObjects/Plane';
import { Triangle } from '../../WorldObjects/Triangle';

export function initCubeVisionWorld() {
    let worldObjects: WorldObject[] = [];

    for (let i = -5; i < 5; i++) {
        for (let j = -5; j < 5; j++) {
            worldObjects.push(new Cube((211 / 255), (84 / 255), 0, {x: i, y: 0, z: j}));
        }
    }
    return new World(
        //worldObjects,
        [
            new Grid(5),
            new Plane(),
            new Triangle()
        ],
        [
            new Camera(
                {x: 2, y: 1, z: 2},
                {x: 0, y: 1, z: 0},
            )
        ]
    )
}