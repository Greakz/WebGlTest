import { Vec3, Vec4 } from '../Math/Vector/vec';

export class DirectionalLight {
    direction: Vec3;
    color: Vec4;
    update(time: number) {}
    constructor(dir: Vec3, color: Vec4) {
        this.direction = dir;
        this.color = color;
    }
}