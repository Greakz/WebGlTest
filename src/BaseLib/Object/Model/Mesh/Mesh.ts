import { ArrayBufferData } from '../DataArrays/ArrayBufferData';
import { ArrayElementBufferData } from '../DataArrays/ArrayElementBufferData';
import { Shader } from '../../../Shader/Shader';
import { Vec3 } from '../../../Math/Vector/vec';
import { subtractVec3 } from '../../../Math/Vector/subtract';
import { crossProductVec3 } from '../../../Math/Vector/crossProduct';
import { normalizeVec3 } from '../../../Math/Vector/normalize';

export abstract class Mesh {

    protected static buildVertexNormals(vertex_coordinates: ArrayBufferData, vertex_indices: ArrayElementBufferData) {
        let vertex_normals: number[] = [];
        for (let i = 0; i < vertex_indices.data.length; i += vertex_coordinates.component_size) {
            let pointAIndice = vertex_indices.data[i];
            let pointA: Vec3 = {
                x: vertex_coordinates.data[pointAIndice * 3],
                y: vertex_coordinates.data[pointAIndice * 3 + 1],
                z: vertex_coordinates.data[pointAIndice * 3 + 2]
            };
            let pointBIndice = vertex_indices.data[i + 1];
            let pointB: Vec3 = {
                x: vertex_coordinates.data[pointBIndice * 3],
                y: vertex_coordinates.data[pointBIndice * 3 + 1],
                z: vertex_coordinates.data[pointBIndice * 3 + 2]
            };
            let pointCIndice = vertex_indices.data[i + 2];
            let pointC: Vec3 = {
                x: vertex_coordinates.data[pointCIndice * 3],
                y: vertex_coordinates.data[pointCIndice * 3 + 1],
                z: vertex_coordinates.data[pointCIndice * 3 + 2]
            };

            let AminB: Vec3 = subtractVec3(pointA, pointB);
            let AminC: Vec3 = subtractVec3(pointA, pointC);
            let normal: Vec3 = normalizeVec3(crossProductVec3(AminB, AminC));
            for (let j = 0; j < 3; j++) {
                vertex_normals.push(normal.x);
                vertex_normals.push(normal.y);
                vertex_normals.push(normal.z);
            }
        }
        return vertex_normals;
    }

    /**
     * Stuff to define
     */
    mesh_identifier: string = 'mesh';
    attribute_pointer_name: string;
    normals_pointer_name: string| null = null;
    vertex_coordinates: ArrayBufferData;
    vertex_indices: ArrayElementBufferData;
    vertex_normals: ArrayBufferData;
    /**
     * auto stuff
     */
    attribute_position_pointer: number;
    attribute_normals_pointer: number;

    /**
     * Function to Overwrite
     * @param {WebGL2RenderingContext} GL
     * @param {Shader} shader
     */
    loadAttributePoiner(GL: WebGL2RenderingContext, shader: Shader) {
        this.attribute_position_pointer = GL.getAttribLocation(shader.getProgram(), this.attribute_pointer_name);
        if(this.normals_pointer_name !== null) {
            this.attribute_normals_pointer = GL.getAttribLocation(shader.getProgram(), this.normals_pointer_name);
        }
    }

    createMesh(GL: WebGL2RenderingContext) {
        this.vertex_indices.createBuffer(GL);
        this.vertex_coordinates.createBuffer(GL);
        if(this.normals_pointer_name !== null) {
            this.vertex_normals = new ArrayBufferData(
                Mesh.buildVertexNormals(
                    this.vertex_coordinates,
                    this.vertex_indices
                ),
                this.vertex_coordinates.component_size
            );
            this.vertex_normals.createBuffer(GL);
        }

    }

    bindBufferAndSetAttributePointer(GL: WebGL2RenderingContext) {
        this.vertex_indices.bindBuffer(GL);
        this.vertex_coordinates.bindBuffer(GL);
        this.vertex_coordinates.setAttributePointer(GL, this.attribute_position_pointer);
        if(this.normals_pointer_name !== null) {
            this.vertex_normals.bindBuffer(GL);
            this.vertex_normals.setAttributePointer(GL, this.attribute_normals_pointer);
        }
    }

    setAttributePointer(GL: WebGL2RenderingContext) {

    }

}