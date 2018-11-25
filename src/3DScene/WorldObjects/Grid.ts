import { getNoTransform, Transformation, WorldObject } from '../Base/WorldObject';
import { SimpleShader } from '../Shaders/SimpleShader';
import { mat4ToFloat32Array } from '../Base/MathTypes/matrix.util';
import { Mat4 } from '../Base/MathTypes/Types/matrix';
import { Vec3 } from '../Base/MathTypes/Types/vectors';
import { Ray } from '../Base/Ray';

const yGrid = -0.0001;
const r = 52 / 255;
const g = 152 / 255;
const b = 219 / 255;

export class Grid extends WorldObject {

    shader: SimpleShader = new SimpleShader('simple-shader-vs', 'simple-shader-fs');

    protected vertexBuffer: WebGLBuffer;
    protected colorBuffer: WebGLBuffer;

    protected vertices = [];
    protected colors = [];

    protected size: number;
    constructor(size: number) {
        super();
        this.size = size;
        for(let i = -1 * size; i <= size; i++) {
            this.pushVertex(i)
        }
    }

    private pushVertex(i: number) {
        this.vertices.push(i);
        this.vertices.push(yGrid);
        this.vertices.push(-1 * this.size);
        this.colors.push(r);
        this.colors.push(g);
        this.colors.push(b);
        this.colors.push(1.0);

        this.vertices.push(i);
        this.vertices.push(yGrid);
        this.vertices.push(this.size);
        this.colors.push(r);
        this.colors.push(g);
        this.colors.push(b);
        this.colors.push(1.0);

        this.vertices.push(-1 * this.size);
        this.vertices.push(yGrid);
        this.vertices.push(i);
        this.colors.push(r);
        this.colors.push(g);
        this.colors.push(b);
        this.colors.push(1.0);

        this.vertices.push(this.size);
        this.vertices.push(yGrid);
        this.vertices.push(i);
        this.colors.push(r);
        this.colors.push(g);
        this.colors.push(b);
        this.colors.push(1.0);
    }

    init(GL: WebGLRenderingContext) {

        this.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.colorBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.colors), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.shader.attachAndLink(GL);
    }

    render(GL: WebGLRenderingContext, time: number, viewMatrix: Mat4, mouseRay: Ray) {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);

        GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
        GL.vertexAttribPointer(this.shader.attr_color, 4, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_color);

        GL.useProgram(this.shader.getProgram());

        GL.uniformMatrix4fv(
            this.shader.uf_view_matrix,
            false,
            mat4ToFloat32Array(viewMatrix));

        GL.uniformMatrix4fv(
            this.shader.uf_model_matrix,
            false,
            this.getModelMatrixF32());

        GL.drawArrays(GL.LINES, 0, (this.size * 4 + 2) * 2);
    }

}