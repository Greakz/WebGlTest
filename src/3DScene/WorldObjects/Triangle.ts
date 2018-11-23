import { getNoTranslation, Translation, WorldObject } from '../Base/WorldObject';
import { TriangleShader } from '../Shaders/TriangleShader';
const mat4= require('gl-mat4')

export class Triangle implements WorldObject {

    translation: Translation = getNoTranslation();
    shader: TriangleShader = new TriangleShader('triangle-shader-vs', 'triangle-shader-fs');

    protected indicesBuffer: WebGLBuffer;
    protected vertexBuffer: WebGLBuffer;

    protected vertices = [
        0.0,1,0.0,
        -1,-1,0.0,
        1,-1,0.0,
    ];
    protected indices = [0,1,2];

    constructor() {}

    init(GL: WebGLRenderingContext) {
        this.vertexBuffer = GL.createBuffer();

        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.indicesBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);

        this.shader.attachAndLink(GL);
    }

    render(GL: WebGLRenderingContext, time: number, viewMatrix: Float32Array) {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);

        GL.useProgram(this.shader.getProgram());

        GL.uniformMatrix4fv(
            this.shader.uf_view_matrix,
            false,
            viewMatrix);
        
        GL.drawElements(GL.TRIANGLES, this.indices.length, GL.UNSIGNED_SHORT,0);
    }

}