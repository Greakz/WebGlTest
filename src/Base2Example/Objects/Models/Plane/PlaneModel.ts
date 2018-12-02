import { Model } from '../../../../Base2/Object/Model2/Model';
import { TextureMap } from '../../../../Base2/Object/Model2/Texture/TextureMap';
import { mat4ToF32 } from '../../../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { Vec4 } from '../../../../Base2/Math/Vector/vec';
import { ExampleShader } from '../../../Shader/ExampleShader';
import { PlaneMesh } from '../../Meshes/PlaneMesh';

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

    renderModel(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(this.vao);

        GL.useProgram(this.shader.getProgram());
        GL.uniformMatrix4fv(this.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
        GL.uniform4f(this.shader.uf_color, this.color.x, this.color.y, this.color.z, this.color.w);

        GL.drawElements(GL.TRIANGLES, this.mesh.vertex_indices.data.length, GL.UNSIGNED_SHORT, 0);
    }
}