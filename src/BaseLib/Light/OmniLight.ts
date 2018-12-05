import { Vec3 } from '../Math/Vector/vec';
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
    constant: number = 0.8; //propagation behaviors
    linear: number = 0.19;
    quadratic: number = 0.032;

    update(time: number) {
    }
}