import { Model } from '../../Base2/Object/Model/Model';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { ExampleShader } from '../Shader/ExampleShader';
import { PlaneVao } from './VAO/PlaneVao';
import { GridVao } from './VAO/GridVao';

export class EditorPlaneModel extends Model {

    protected planeVao: PlaneVao;
    protected gridVao: GridVao;
    protected size: number;
    protected centerBlockLine: boolean;

    constructor(size: number, centerBlockLine?: boolean) {
        super();
        this.size = size;
        if(centerBlockLine) {
            this.centerBlockLine = centerBlockLine;
        } else {
            this.centerBlockLine = false;
        }
    }

    init() {
        this.planeVao = EditorPlaneModel.VAOProvider.getVao(new PlaneVao(this.size, this.centerBlockLine));
        this.gridVao = EditorPlaneModel.VAOProvider.getVao(new GridVao(this.size, this.centerBlockLine));
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        // Draw Plane
        GL.bindVertexArray(this.planeVao.get());
        GL.useProgram(this.planeVao.shader.getProgram());
        GL.uniform4f(this.planeVao.shader.uf_color,0.6, 0.6, 0.6, 0.2);
        GL.uniformMatrix4fv(this.planeVao.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.planeVao.shader.uf_projectionMatrix, false, mat4ToF32(projMat));
        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);

        // Draw Vao
        GL.bindVertexArray(this.gridVao.get());
        GL.uniform4f(this.gridVao.shader.uf_color, 0.8, 0.8, 0.8, 0.5);
        GL.uniformMatrix4fv(this.gridVao.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.gridVao.shader.uf_projectionMatrix,false, mat4ToF32(projMat));
        GL.drawArrays(GL.LINES, 0, this.gridVao.drawVertices);
    }
}