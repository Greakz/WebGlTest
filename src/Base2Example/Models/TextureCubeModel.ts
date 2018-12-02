import { Model } from '../../Base2/Object/Model/Model';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { TextureCubeVao } from './VAO/TextureCubeVao';
import { WoodTexture } from './Texture/WoodTexture';
import { Vec4 } from '../../Base2/Math/Vector/vec';

export class TextureCubeModel extends Model {

    protected vao: TextureCubeVao;
    texture: WoodTexture;
    color: Vec4 = {x: 1, y: 0.5, z: 0.5, w: 1};

    constructor() {
        super();
    }

    init() {
        this.vao = TextureCubeModel.VAOProvider.getVao(new TextureCubeVao());
        this.texture = TextureCubeModel.TextureProvider.getTexture(new WoodTexture());
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        if(this.texture.isReady()) {
            GL.bindVertexArray(this.vao.get());

            GL.useProgram(this.vao.shader.getProgram());
            GL.uniformMatrix4fv(this.vao.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
            GL.uniformMatrix4fv(this.vao.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
            GL.uniform4f(this.vao.shader.uf_color, this.color.x, this.color.y, this.color.z, this.color.w);

            this.texture.bindTexture(GL, this.vao.shader);

            GL.drawElements(GL.TRIANGLES, 36, GL.UNSIGNED_SHORT, 0);
        }
    }
}