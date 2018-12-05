import { Vec3, Vec4 } from '../Math/Vector/vec';
import { Light } from './Light';

export class OmniLight extends Light {
    constructor(position: Vec3, color?: Vec3) {
        super();
        this.position = position;
        if (color !== undefined) {
            this.color = color;
        }
    }

    position: Vec3;

    update(time: number) {
    }
}