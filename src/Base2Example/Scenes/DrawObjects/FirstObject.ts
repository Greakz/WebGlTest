import { DrawObject } from '../../../Base2/Object/DrawObject';
import { Shader } from '../../../Base2/Shader/Shader';
import { Canvas } from '../../../Base2/Singleton/Canvas';
import CanvasSingleton from '../../../Base2/Singleton/CanvasSingleton';

export class FirstObject extends DrawObject {

    // All this shit gets replaced by a VBO Object
    private Canvas: Canvas = CanvasSingleton.getInstance();
    private shader: Shader;
    private vertexBuffer: WebGLBuffer;
    private indicesBuffer: WebGLBuffer;

    init() {
        // Normaly Just ask the VBO Provider here to get the VBO
        // But since this is a test and the vbo provider isnt implemented yet, hacks...
        this.shader = FirstObject.ShaderProvider.getShader(new Shader());
        const GL = this.Canvas.getGl();

        this.vertexBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array([
            -0.5, -0.5, 0,
            0.5, 0.5, 0,
            -0.5, 0.5, 0,
            0.5, -0.5, 0
        ]), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER, null);

        this.indicesBuffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 3, 1]), GL.STATIC_DRAW);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null);
    }

    update(time) {
    }
    render(GL: WebGLRenderingContext) {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        GL.useProgram(this.shader.getProgram());

        GL.uniformMatrix4fv(
            this.shader.uf_modelMatrix,
            false,
            new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ]));

        GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0)
    }
}