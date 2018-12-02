import { ArrayBufferData } from '../../../BaseLib/Object/Model/DataArrays/ArrayBufferData';
import { ArrayElementBufferData } from '../../../BaseLib/Object/Model/DataArrays/ArrayElementBufferData';
import { Mesh } from '../../../BaseLib/Object/Model/Mesh/Mesh';

export class PlaneMesh extends Mesh {
    mesh_identifier: string;
    attribute_pointer_name: string = 'vertexPosition';
    vertex_coordinates: ArrayBufferData;
    vertex_indices: ArrayElementBufferData;

    constructor(size: number) {
        super();
        this.mesh_identifier = 'grid-' + size;
        const halfSize: number = size / 2;
        this.vertex_coordinates = new ArrayBufferData([
            -halfSize, 0, -halfSize,
            -halfSize, 0, halfSize,
            halfSize, 0, -halfSize,
            halfSize, 0, halfSize
        ], 3);
        this.vertex_indices = new ArrayElementBufferData([0, 1, 2, 1, 3, 2]);
    }
}