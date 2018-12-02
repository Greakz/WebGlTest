import { ArrayBufferData } from '../../../Base2/Object/Model/DataArrays/ArrayBufferData';
import { ArrayElementBufferData } from '../../../Base2/Object/Model/DataArrays/ArrayElementBufferData';
import { Mesh } from '../../../Base2/Object/Model/Mesh/Mesh';

const yGrid = 0.001;

export class GridMesh extends Mesh {

    mesh_identifier: string = 'plane-mesh';
    attribute_pointer_name: string = 'vertexPosition';
    vertex_coordinates: ArrayBufferData;
    vertex_indices: ArrayElementBufferData;

    private indiceCount = 0;

    constructor(size: number) {
        super();
        this.mesh_identifier = 'plane-' + size;
        let vertexPoints: number[] = [];
        let vertexIndices: number[] = [];
        let indicecount = 0;
        let halfSize: number = size / 2;
        for (let i = -halfSize; i <= halfSize; i++) {
            vertexPoints = this.pushVertex(vertexPoints, i, halfSize);
            vertexIndices.push(indicecount);
            indicecount++;
            vertexIndices.push(indicecount);
            indicecount++;
            vertexIndices.push(indicecount);
            indicecount++;
            vertexIndices.push(indicecount);
            indicecount++;
        }
        this.vertex_coordinates = new ArrayBufferData(vertexPoints, 3);
        this.vertex_indices = new ArrayElementBufferData(vertexIndices);
    }

    private pushVertex(array: number[], i: number, size: number) {
        // First Line
        array.push(i);
        array.push(yGrid);
        array.push(-1 * size);

        array.push(i);
        array.push(yGrid);
        array.push(size);

        // Second Line
        array.push(-1 * size);
        array.push(yGrid);
        array.push(i);

        array.push(size);
        array.push(yGrid);
        array.push(i);

        return array;
    }

}

