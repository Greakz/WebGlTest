import { Vec3 } from '../Math/Vector/vec';

export class Light {
    color: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    ambient: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    diffuse: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    specular: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
}