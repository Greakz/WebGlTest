import { World } from '../../Base/World';
import { Camera } from '../../Base/Camera';
import { Triangle } from '../../WorldObjects/Triangle';

export function initCubeVisionWorld() {
    return new World(
        [
            new Triangle()
        ],
        [
            new Camera(
                new Float32Array([0, 0, -2]),
                new Float32Array([0, 0, 0]),
                1.1
            )
        ]
    )
}