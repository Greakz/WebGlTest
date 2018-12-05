import { Light } from './Light';
import { Vec3 } from '../Math/Vector/vec';

export class AmbientLight extends Light {
    constructor(color?: Vec3) {
        super();
        if (color !== undefined) {
            this.color = color;
        }
    }

    update(time: number) {
    }
}