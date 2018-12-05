import { Model } from '../../../../BaseLib/Object/Model/Model';
import { TextureMap } from '../../../../BaseLib/Object/Model/Texture/TextureMap';
import { mat4ToF32 } from '../../../../BaseLib/Math/Matrix/matTo';
import { Mat4 } from '../../../../BaseLib/Math/Matrix/mat';
import { Vec4 } from '../../../../BaseLib/Math/Vector/vec';
import { ExampleShader } from '../../../Shader/ExampleShader';
import { PlaneMesh } from '../../Meshes/PlaneMesh';
import { SceneLightning } from '../../../../BaseLib/Light/SceneLightning';

export class PlaneModel extends Model<ExampleShader> {
    model_identifier: string = 'plane';
    shader: ExampleShader = PlaneModel.ShaderProvider.getShader(new ExampleShader());
    mesh: PlaneMesh;
    textures: TextureMap[] = [];
    color: Vec4 = {x: 0.4, y: 0.4, z: 0.4, w: 0.6};

    constructor(size: number) {
        super();
        this.mesh = PlaneModel.MeshProvider.getMesh(new PlaneMesh(size));
    }

    protected uniformBuffer: WebGLBuffer | null = null;
    protected uniformBlockBinding: number;
    renderModel(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4, sceneLightning: SceneLightning) {
        GL.bindVertexArray(this.vao);

        GL.useProgram(this.shader.getProgram());

        /*
        UBO TEST
        if(this.uniformBuffer === null) {
            this.initUniformBuffer(GL, this.shader);
        }
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.uniformBuffer);
        GL.bindBufferBase(GL.UNIFORM_BUFFER, this.uniformBlockBinding, this.uniformBuffer);
        */

        GL.uniformMatrix4fv(this.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
        GL.uniform4f(this.shader.uf_color, this.color.x, this.color.y, this.color.z, this.color.w);

        GL.drawElements(GL.TRIANGLES, this.mesh.vertex_indices.data.length, GL.UNSIGNED_SHORT, 0);
    }
/*
THIS WAS A UBO TEST
    private initUniformBuffer(GL: WebGL2RenderingContext, shader: ExampleShader) {
        this.uniformBuffer = GL.createBuffer();
        // buffer data to uniform buffer and set pointer!?
        const bufferData: Float32Array = new Float32Array([
            1, 1, 1, 1.0,
            0, 0.0, 0, 1.0,
            0, 0.0, 0, 1.0,
            0, 0, 1, 1.0,
            0, 0.0, 0, 1.0,
        ]);
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.uniformBuffer);
        GL.bufferData(GL.UNIFORM_BUFFER, bufferData, GL.DYNAMIC_DRAW);
        GL.bindBuffer(GL.UNIFORM_BUFFER, null);

        this.uniformBlockBinding = GL.getUniformBlockIndex(shader.getProgram(), 'light');
    }
    */
}