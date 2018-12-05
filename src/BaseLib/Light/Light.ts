import { Vec3 } from '../Math/Vector/vec';
import { SceneLightning } from './SceneLightning';

export class Light {
    SceneLightning: SceneLightning;

    setSceneLightning(sl: SceneLightning) {
        this.SceneLightning = sl;
    }

    color: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    ambient: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    diffuse: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    specular: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
}