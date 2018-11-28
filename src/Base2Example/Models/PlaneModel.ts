import { Model } from '../../Base2/Object/Model/Model';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { PlaneVao } from './VAO/PlaneVao';

export class PlaneModel extends Model {

    protected planeVao: PlaneVao;

    constructor() {
        super();
    }

    init() {
        this.planeVao = PlaneModel.VAOProvider.getVao(new PlaneVao(0, true));
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        // Draw Plane
        GL.bindVertexArray(this.planeVao.get());
        GL.useProgram(this.planeVao.shader.getProgram());
        GL.uniform4f(this.planeVao.shader.uf_color,0.0, 0.0, 0.0, 1);
        GL.uniformMatrix4fv(this.planeVao.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.planeVao.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);
    }
}