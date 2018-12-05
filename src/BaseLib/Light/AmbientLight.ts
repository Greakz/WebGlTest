import { Light } from './Light';
import { Vec3 } from '../Math/Vector/vec';

export class AmbientLight extends Light {
    constructor(color?: Vec3) {
        super();
        if (color !== undefined) {
            this.color = color;
        }
        this.ambient = {x: 1.0, y: 1.0, z: 1.0};
    }

    update(time: number) {
    }
}