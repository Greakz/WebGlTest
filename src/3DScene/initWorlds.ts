import { World } from './Base/World';
import { initCubeVisionWorld } from './Worlds/CubeVision/initCubeVisionWorld';

export function initWorlds(): World[] {
    let worlds: World[] = [];
    worlds.push(initCubeVisionWorld());
    return worlds;
}