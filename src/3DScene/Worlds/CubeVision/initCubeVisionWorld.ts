import { World } from '../../Base/World';
import { Camera } from '../../Base/Camera';
import { Cube } from '../../WorldObjects/Cube';
import { WorldObject } from '../../Base/WorldObject';

export function initCubeVisionWorld() {
    let worldObjects: WorldObject[] = [];

    for (let i = -5; i < 5; i++) {
        for (let j = -5; j < 5; j++) {
            worldObjects.push(new Cube((211 / 255), (84 / 255), 0, {x: i, y: 1, z:j}));
        }
    }
    return new World(
        worldObjects,
        [
            new Camera(
                {x: 2, y: 1, z: 2},
                {x: 0, y: 1, z: 0},
            )
        ]
    )
}