import { Material } from '../../../BaseLib/Object/Model/Material/Material';
import { Vec3 } from '../../../BaseLib/Math/Vector/vec';

export class GoldMaterial extends Material {
    ambient: Vec3 = {x: 0.24725, y: 0.1995, z: 0.0745};
    diffuse: Vec3 = {x: 0.75164, y: 0.60648, z: 0.22648};
    specular: Vec3 = {x: 0.628281, y: 0.555802, z: 0.366065};
    shininess: number = 0.4 * 128;
}