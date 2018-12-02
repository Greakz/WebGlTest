import { Mesh } from '../Object/Model2/Mesh/Mesh';

export interface MeshProvider {
    getMesh<T extends Mesh>(mesh: T): T;
}