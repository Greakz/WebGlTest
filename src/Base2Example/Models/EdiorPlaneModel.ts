import { Model } from '../../Base2/Object/Model/Model';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { ExampleShader } from '../Shader/ExampleShader';
import { PlaneVao } from './VAO/PlaneVao';
import { GridVao } from './VAO/GridVao';

export class EditorPlaneModel extends Model {

    protected planeVao: PlaneVao;
    protected gridVao: GridVao;
    protected shader: ExampleShader;
    protected size: number;

    constructor(size: number) {
        super();
        this.size = size;
    }

    init() {
        this.planeVao = EditorPlaneModel.VAOProvider.getVao(new PlaneVao(this.size));
        this.gridVao = EditorPlaneModel.VAOProvider.getVao(new GridVao(this.size));
        this.shader = EditorPlaneModel.ShaderProvider.getShader(new ExampleShader());
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(this.planeVao.get());
        GL.useProgram(this.shader.getProgram());

        GL.uniform4f(
            this.shader.uf_color,
            0.6, 0.6, 0.6, 0.2);

        GL.uniformMatrix4fv(
            this.shader.uf_modelMatrix,
            false,
            mat4ToF32(modelMat));

        GL.uniformMatrix4fv(
            this.shader.uf_projectionMatrix,
            false,
            mat4ToF32(projMat));

        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);

        GL.uniform4f(
            this.shader.uf_color,
            0.8, 0.8, 0.8, 0.5);

        GL.uniformMatrix4fv(
            this.shader.uf_modelMatrix,
            false,
            mat4ToF32(modelMat));

        GL.uniformMatrix4fv(
            this.shader.uf_projectionMatrix,
            false,
            mat4ToF32(projMat));

        GL.bindVertexArray(this.gridVao.get());

        GL.drawArrays(GL.LINES, 0, this.size * 8 + 4);

        GL.bindVertexArray(null);
    }
}