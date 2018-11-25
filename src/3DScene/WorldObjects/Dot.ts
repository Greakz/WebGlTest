import { WorldObject } from '../Base/WorldObject';
import { SimpleShader } from '../Shaders/SimpleShader';
import { mat4ToFloat32Array } from '../Base/MathTypes/matrix.util';
import { Mat4 } from '../Base/MathTypes/Types/matrix';
import { Vec3, Vec4 } from '../Base/MathTypes/Types/vectors';
import { Ray } from '../Base/Ray';
import { MonoColorShader } from '../Shaders/MonoColorShader';
import { vec4toF32 } from '../Base/MathTypes/vector.util';

const yGrid = -0.0001;
const r = 52 / 255;
const g = 152 / 255;
const b = 219 / 255;

export class Line extends WorldObject {

    shader: MonoColorShader = new MonoColorShader('monocolor-shader-vs', 'monocolor-shader-fs');

    protected vertexBuffer: WebGLBuffer;

    protected from: Vec3;
    protected to: Vec3;
    protected vertices = [];
    protected color: Vec4;

    protected size: number;
    constructor(from: Vec3, to: Vec3, color: Vec4) {
        super();
        this.from = from;
        this.to = to;
        this.color = color;
    }

    private pointsToVertices() {
        this.vertices = [
            this.from.x, this.from.y, this.from.z,
            this.to.x, this.to.y, this.to.z
        ]
    }

    init(GL: WebGLRenderingContext) {
        this.pointsToVertices();

        this.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.shader.attachAndLink(GL);
    }

    render(GL: WebGLRenderingContext, time: number, viewMatrix: Mat4, mouseRay: Ray) {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);

        GL.useProgram(this.shader.getProgram());

        GL.uniformMatrix4fv(
            this.shader.uf_view_matrix,
            false,
            mat4ToFloat32Array(viewMatrix));

        GL.uniformMatrix4fv(
            this.shader.uf_model_matrix,
            false,
            this.getModelMatrixF32());
        GL.uniform4fv(
            this.shader.uf_color,
            vec4toF32(this.color));

        GL.drawArrays(GL.LINES, 0, 2);
    }

}