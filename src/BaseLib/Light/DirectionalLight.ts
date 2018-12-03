import { Vec3, Vec4 } from '../Math/Vector/vec';

export class DirectionalLight {
    direction: Vec3 = {x: -2, y: 1, z: 0};
    color: Vec4 = {x: 1.0, y: 0.0, z: 0.0, w: 0.6};
    update(time: number) {}
}