import { Vec3, Vec4 } from '../Math/Vector/vec';
import { Light } from './Light';

export class OmniLight extends Light{
    position: Vec3;
    direction: Vec3;
    cone_angle: Vec3;
    update(time: number) {}
}