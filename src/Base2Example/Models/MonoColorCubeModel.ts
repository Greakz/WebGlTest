import { Model } from '../../Base2/Object/Model/Model';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { Vec4 } from '../../Base2/Math/Vector/vec';
import { MonoColorCubeVao } from './VAO/MonoColorCubeVao';

export class MonoColorCubeModel extends Model {

    protected vao: MonoColorCubeVao;
    color: Vec4 = {x: 0.3, y: 0.3, z: 0.3, w: 0.8};

    constructor() {
        super();
    }

    init() {
        this.vao = MonoColorCubeModel.VAOProvider.getVao(new MonoColorCubeVao());
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(this.vao.get());
        GL.useProgram(this.vao.shader.getProgram());
        GL.uniform4f(this.vao.shader.uf_color,this.color.x, this.color.y, this.color.z, this.color.w);
        GL.uniformMatrix4fv(this.vao.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.vao.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
        GL.drawElements(GL.TRIANGLES, 36, GL.UNSIGNED_SHORT, 0);
    }
}