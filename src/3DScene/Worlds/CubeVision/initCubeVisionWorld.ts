import { World } from '../../Base/World';
import { Camera } from '../../Base/Camera';
import { Cube } from '../../WorldObjects/MonoColorCube';
import { WorldObject } from '../../Base/WorldObject';
import { Grid } from '../../WorldObjects/Grid';
import { Plane } from '../../WorldObjects/Plane';
import { Triangle } from '../../WorldObjects/Triangle';

export function initCubeVisionWorld() {
    let worldObjects: WorldObject[] = [];

    for (let i = -5; i < 5; i++) {
        for (let j = -5; j < 5; j++) {
            worldObjects.push(new Cube({x:(52 / 255), y:(152 / 255), z:(219 / 255), w: 0.2}, {x: i*2, y: 0, z: j*2}));
        }
    }
    return new World(
        //worldObjects,
        [
            ...worldObjects,
            // new Cube({x:(52 / 255), y:(152 / 255), z:(219 / 255), w: 0.2}, {x: 1, y: 2, z: 1}),
            new Grid(5),
            new Plane(),
            new Triangle(),
        ],
        [
            new Camera(
                {x: 0, y: 2, z: 8},
                {x: 0, y: 1, z: 0},
            )
        ]
    )
}