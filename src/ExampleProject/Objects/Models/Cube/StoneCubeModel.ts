import { Model } from '../../../../BaseLib/Object/Model/Model';
import { TextureShader } from '../../../Shader/TextureShader';
import { CubeMesh } from '../../Meshes/CubeMesh';
import { TextureMap } from '../../../../BaseLib/Object/Model/Texture/TextureMap';
import { mat4ToF32 } from '../../../../BaseLib/Math/Matrix/matTo';
import { Mat4 } from '../../../../BaseLib/Math/Matrix/mat';
import { Vec4 } from '../../../../BaseLib/Math/Vector/vec';
import { StoneCubeTexture } from './Textures/StoneCubeTexture';
import { SceneLightning } from '../../../../BaseLib/Light/SceneLightning';
import { GoldMaterial } from '../../Materials/GoldMaterial';
import { Material } from '../../../../BaseLib/Object/Model/Material/Material';

export class StoneCubeModel extends Model<TextureShader> {
    model_identifier: string = 'stone-cube';
    shader: TextureShader = StoneCubeModel.ShaderProvider.getShader(new TextureShader());
    mesh: CubeMesh = StoneCubeModel.MeshProvider.getMesh(new CubeMesh());
    textures: TextureMap[] = [
        new StoneCubeTexture()
    ];
    material: Material = new Material();
    color: Vec4 = {x: 1.0, y: 1.0, z: 1.0, w: 1.0};

    renderModel(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4, sceneLightning: SceneLightning) {
        GL.bindVertexArray(this.vao);

        GL.useProgram(this.shader.getProgram());

        sceneLightning.getLightUbo().updateMaterial(GL, this.material)
        sceneLightning.getLightUbo().bind(GL, this.shader);

        GL.uniformMatrix4fv(this.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
        GL.uniform4f(this.shader.uf_color, this.color.x, this.color.y, this.color.z, this.color.w);

        this.textures.forEach((t: TextureMap) => t.bindTexture(GL));

        GL.drawElements(GL.TRIANGLES, this.mesh.vertex_indices.data.length, GL.UNSIGNED_SHORT, 0);

        this.mesh.drawNormals(GL, projMat, modelMat);
    }
}