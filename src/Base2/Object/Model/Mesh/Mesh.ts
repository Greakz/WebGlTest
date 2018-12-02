import { ArrayBufferData } from '../DataArrays/ArrayBufferData';
import { ArrayElementBufferData } from '../DataArrays/ArrayElementBufferData';
import { Shader } from '../../../Shader/Shader';

export class Mesh {

    /**
     * Stuff to define
     */
    mesh_identifier: string = 'mesh';
    attribute_pointer_name: string;
    vertex_coordinates: ArrayBufferData;
    vertex_indices: ArrayElementBufferData;
    /**
     * auto stuff
     */
    attribute_pointer: number;

    /**
     * Function to Overwrite
     * @param {WebGL2RenderingContext} GL
     * @param {Shader} shader
     */
    loadAttributePoiner(GL: WebGL2RenderingContext, shader: Shader) {
        this.attribute_pointer = GL.getAttribLocation(shader.getProgram(), this.attribute_pointer_name);
    }

    createMesh(GL: WebGL2RenderingContext) {
        this.vertex_indices.createBuffer(GL);
        this.vertex_coordinates.createBuffer(GL);
    }

    bindBuffer(GL: WebGL2RenderingContext) {
        this.vertex_indices.bindBuffer(GL);
        this.vertex_coordinates.bindBuffer(GL);
    }

    setAttributePointer(GL: WebGL2RenderingContext) {
        this.vertex_coordinates.setAttributePointer(GL, this.attribute_pointer);
    }

}