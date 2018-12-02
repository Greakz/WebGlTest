import { Mesh } from '../Object/Model/Mesh/Mesh';

export interface MeshProvider {
    getMesh<T extends Mesh>(mesh: T): T;
}