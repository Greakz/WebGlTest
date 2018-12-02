import { getNoTransform, WorldObject } from '../Base/WorldObject';
import { Mat4 } from '../Base/MathTypes/Types/matrix';
import { mat4ToFloat32Array } from '../Base/MathTypes/matrix.util';
import { Vec3, Vec4 } from '../Base/MathTypes/Types/vectors';
import { Ray } from '../Base/Ray';
import { MonoColorShader } from '../Shaders/MonoColorShader';

export class Cube extends WorldObject {

    shader: MonoColorShader = new MonoColorShader('monocolor-shader-vs', 'monocolor-shader-fs');

    protected indicesBuffer: WebGLBuffer;
    protected vertexBuffer: WebGLBuffer;
    protected colorBuffer: WebGLBuffer;

    protected vertices = [
        // vordere Fläche
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        // hintere Fläche
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

        // obere Fläche
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        // untere Fläche
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,

        // rechte Fläche
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        // linke Fläche
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0
    ];
    protected indices = [
        0, 1, 2, 0, 2, 3,    // vorne
        4, 5, 6, 4, 6, 7,    // hinten
        8, 9, 10, 8, 10, 11,   // oben
        12, 13, 14, 12, 14, 15,   // unten
        16, 17, 18, 16, 18, 19,   // rechts
        20, 21, 22, 20, 22, 23    // links
    ];
    protected colors = [];
    protected color: Vec4;

    constructor(color:Vec4, pos: Vec3) {
        super();
        this.transformation = getNoTransform();
        this.transformation.translation = pos;
        this.color = color;
        for (let i = 0; i < this.indices.length; i++) {
            this.colors.push(color.x);
            this.colors.push(color.y);
            this.colors.push(color.z);
            this.colors.push(color.w);
        }
    }

    init(GL: WebGLRenderingContext) {

        this.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        //this.colorBuffer = GL.createBuffer();
        //GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
        //GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.colors), GL.STATIC_DRAW);
        //GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.indicesBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);

        this.shader.attachAndLink(GL);
    }

    update(time) {

    }

    render(GL: WebGLRenderingContext, time: number, viewMatrix: Mat4, mouseRay: Ray) {

        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);

        //GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
        //GL.vertexAttribPointer(this.shader.attr_color, 4, GL.FLOAT, false, 0, 0);
        //GL.enableVertexAttribArray(this.shader.attr_color);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);

        GL.useProgram(this.shader.getProgram());

        GL.uniformMatrix4fv(
            this.shader.uf_view_matrix,
            false,
            mat4ToFloat32Array(viewMatrix));

        GL.uniformMatrix4fv(
            this.shader.uf_model_matrix,
            false,
            this.getModelMatrixF32());

        let color = this.color;
        if (this.hovered) {
            color = {x:1.0, y:0.0, z:0.0, w:1.0};
        }

        GL.uniform4f(
            this.shader.uf_color,
            color.x,
            color.y,
            color.z,
            color.w);

        GL.drawElements(GL.TRIANGLES, this.indices.length, GL.UNSIGNED_SHORT, 0);
    }

}