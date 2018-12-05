import { Vec3, Vec4 } from '../Math/Vector/vec';
import { Light } from './Light';

export class SpotLight extends Light {
    constructor(position: Vec3, direction: Vec3, cone_angle: Vec3, color?: Vec3) {
        super();
        this.position = position;
        this.direction = direction;
        this.cone_angle = cone_angle;
        if (color !== undefined) {
            this.color = color;
        }
    }

    position: Vec3;
    direction: Vec3;
    cone_angle: Vec3;

    update(time: number) {
    }
}