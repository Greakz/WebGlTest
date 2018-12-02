import { Model } from '../../../../Base2/Object/Model/Model';
import { TextureMap } from '../../../../Base2/Object/Model/Texture/TextureMap';
import { mat4ToF32 } from '../../../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../../../Base2/Math/Matrix/mat';
import { Vec4 } from '../../../../Base2/Math/Vector/vec';
import { ExampleShader } from '../../../Shader/ExampleShader';
import { GridMesh } from '../../Meshes/GridMesh';

export class GridModel extends Model<ExampleShader> {
    model_identifier: string = 'plane';
    shader: ExampleShader = GridModel.ShaderProvider.getShader(new ExampleShader());
    mesh: GridMesh;
    textures: TextureMap[] = [];
    color: Vec4 = {x: 0., y: 0., z: 0., w: 1};

    constructor(size: number) {
        super();
        this.mesh = GridModel.MeshProvider.getMesh(new GridMesh(size));
    }

    renderModel(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(this.vao);

        GL.useProgram(this.shader.getProgram());
        GL.uniformMatrix4fv(this.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
        GL.uniform4f(this.shader.uf_color, this.color.x, this.color.y, this.color.z, this.color.w);

        GL.drawElements(GL.LINES, this.mesh.vertex_indices.data.length, GL.UNSIGNED_SHORT, 0);
    }
}