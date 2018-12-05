import { ArrayBufferData } from '../DataArrays/ArrayBufferData';
import { ArrayElementBufferData } from '../DataArrays/ArrayElementBufferData';
import { Shader } from '../../../Shader/Shader';
import { Vec3 } from '../../../Math/Vector/vec';
import { subtractVec3 } from '../../../Math/Vector/subtract';
import { crossProductVec3 } from '../../../Math/Vector/crossProduct';
import { normalizeVec3 } from '../../../Math/Vector/normalize';
import { Mat4 } from '../../../Math/Matrix/mat';
import { ExampleShader } from '../../../../ExampleProject/Shader/ExampleShader';
import { mat4ToF32 } from '../../../Math/Matrix/matTo';
import { addVec3 } from '../../../Math/Vector/add';
import { HasProvider } from '../../../Singleton/HasSingletons';
import { NormalsShader } from '../../../Shader/NormalsShader';
import { scaleVec3 } from '../../../Math/Vector/scale';

export abstract class Mesh extends HasProvider {

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
    normals_pointer_name: string | null = null;
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
        if (this.normals_pointer_name !== null) {
            this.attribute_normals_pointer = GL.getAttribLocation(shader.getProgram(), this.normals_pointer_name);
        }
    }

    createMesh(GL: WebGL2RenderingContext) {
        this.vertex_indices.createBuffer(GL);
        this.vertex_coordinates.createBuffer(GL);
        if (this.normals_pointer_name !== null) {
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
        if (this.normals_pointer_name !== null) {
            this.vertex_normals.bindBuffer(GL);
            this.vertex_normals.setAttributePointer(GL, this.attribute_normals_pointer);
        }
        this.vertex_indices.bindBuffer(GL);
        this.vertex_coordinates.bindBuffer(GL);
        this.vertex_coordinates.setAttributePointer(GL, this.attribute_position_pointer);
    }

    setAttributePointer(GL: WebGL2RenderingContext) {
    }

    /**
     * DEBUG HELPER
     * NORMALISED VERTICE DRAWS
     */
    private normalsLineBuffer: WebGLBuffer | null = null;
    private normalsColorBuffer: WebGLBuffer | null = null;
    private normalsLineVertex: number[] = [];
    private normalsLineColors: number[] = [];
    private normalsShader: NormalsShader = Mesh.ShaderProvider.getShader(new NormalsShader());

    private initNormalLineBuffer(GL: WebGL2RenderingContext) {
        for (let i = 0; i < this.vertex_indices.data.length; i++) {
            let vertIndex = this.vertex_indices.data[i] * 3;
            let normIndex = i * 3;
            let vertPos: Vec3 = {
                x: this.vertex_coordinates.data[vertIndex],
                y: this.vertex_coordinates.data[vertIndex + 1],
                z: this.vertex_coordinates.data[vertIndex + 2]
            };
            let vertNorm: Vec3 = {
                x: this.vertex_normals.data[normIndex],
                y: this.vertex_normals.data[normIndex + 1],
                z: this.vertex_normals.data[normIndex + 2]
            };
            this.addNormalsLineVertex(vertPos, vertNorm);
        }
        this.normalsLineBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.normalsLineBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.normalsLineVertex), GL.STATIC_DRAW);
        this.normalsColorBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.normalsColorBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.normalsLineColors), GL.STATIC_DRAW);
    }

    private addNormalsLineVertex(vertexPosition: Vec3, vertexNormal: Vec3) {
        this.normalsLineVertex.push(vertexPosition.x);
        this.normalsLineVertex.push(vertexPosition.y);
        this.normalsLineVertex.push(vertexPosition.z);
        this.normalsLineColors.push(vertexNormal.x);
        this.normalsLineColors.push(vertexNormal.y);
        this.normalsLineColors.push(vertexNormal.z);

        let vertAndNorm = addVec3(vertexPosition, scaleVec3(vertexNormal, 0.2));
        this.normalsLineVertex.push(vertAndNorm.x);
        this.normalsLineVertex.push(vertAndNorm.y);
        this.normalsLineVertex.push(vertAndNorm.z);
        this.normalsLineColors.push(vertexNormal.x);
        this.normalsLineColors.push(vertexNormal.y);
        this.normalsLineColors.push(vertexNormal.z);
    }


    drawNormals(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(null);
        if (this.normalsLineBuffer === null) {
            this.initNormalLineBuffer(GL);
        } else {
            GL.bindBuffer(GL.ARRAY_BUFFER, this.normalsLineBuffer);
            GL.vertexAttribPointer(this.normalsShader.attr_position, 3, GL.FLOAT, false, 0, 0);
            GL.enableVertexAttribArray(this.normalsShader.attr_position);
            GL.bindBuffer(GL.ARRAY_BUFFER, this.normalsColorBuffer);
            GL.vertexAttribPointer(this.normalsShader.attr_normal, 3, GL.FLOAT, false, 0, 0);
            GL.enableVertexAttribArray(this.normalsShader.attr_normal);
            GL.useProgram(this.normalsShader.getProgram());
            GL.uniformMatrix4fv(this.normalsShader.modelMatrix, false, mat4ToF32(modelMat));
            GL.uniformMatrix4fv(this.normalsShader.projectionMatrix, false, mat4ToF32(projMat));
            GL.drawArrays(GL.LINES, 0,  72);
            GL.bindBuffer(GL.ARRAY_BUFFER, null);
        }
    }

}