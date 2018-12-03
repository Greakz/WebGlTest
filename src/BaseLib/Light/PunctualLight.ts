import { Vec3, Vec4 } from '../Math/Vector/vec';

export class PunctualLight {
    position: Vec3;
    color: Vec4;
    // any stuff for restricting shine area
    update(time: number) {}
}