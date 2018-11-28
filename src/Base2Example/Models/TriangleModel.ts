import { Model } from '../../Base2/Object/Model/Model';
import { TriangleVao } from './VAO/TriangleVao';
import { mat4ToF32 } from '../../Base2/Math/Matrix/matTo';
import { Mat4 } from '../../Base2/Math/Matrix/mat';
import { ExampleShader } from '../Shader/ExampleShader';
import { Vec4 } from '../../Base2/Math/Vector/vec';

export class TriangleModel extends Model {

    protected shader: ExampleShader;
    protected vao: TriangleVao;

    protected color: Vec4 = {
        x: 0,
        y: 0,
        z: 0,
        w: 1
    };

    constructor() {
        super();
    }
    init() {
        this.vao = Model.VAOProvider.getVao(new TriangleVao());
        this.shader = Model.ShaderProvider.getShader(new ExampleShader());
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {
        GL.bindVertexArray(this.vao.get());
        GL.useProgram(this.vao.shader.getProgram());

        GL.uniform4f(this.shader.uf_color, this.color.x, this.color.y, this.color.z, this.color.w);
        GL.uniformMatrix4fv(this.shader.uf_modelMatrix, false, mat4ToF32(modelMat));
        GL.uniformMatrix4fv(this.shader.uf_projectionMatrix, false, mat4ToF32(projMat));

        GL.drawElements(GL.TRIANGLES, 3, GL.UNSIGNED_SHORT, 0);
        GL.bindVertexArray(null);
    }
    setColor(color: Vec4) {
        this.color = color;
    }
}