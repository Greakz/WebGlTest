import { Vec3, Vec4 } from '../Math/Vector/vec';
import { normalizeVec3 } from '../Math/Vector/normalize';
import { Light } from './Light';

export class DirectionalLight extends Light{
    direction: Vec3;
    update(time: number) {}
    constructor(dir: Vec3, color?: Vec3) {
        super();
        this.direction = normalizeVec3(dir);
        if(color !== undefined) {
            this.color = color;
        }
        this.diffuse = {x: 0.5, y: 0.5, z: 0.5};
    }
}