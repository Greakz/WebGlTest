import { Vec3, Vec4 } from '../Math/Vector/vec';
import { normalizeVec3 } from '../Math/Vector/normalize';

export class DirectionalLight {
    direction: Vec3;
    color: Vec4;
    update(time: number) {}
    constructor(dir: Vec3, color: Vec4) {
        this.direction = normalizeVec3(dir);
        this.color = color;
    }
}