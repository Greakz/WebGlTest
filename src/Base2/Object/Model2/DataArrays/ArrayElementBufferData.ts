export class ArrayElementBufferData {
    buffer: WebGLBuffer;
    data: number[];

    constructor(data: number[]) {
        this.data = data;
    }

    createBuffer(GL: WebGL2RenderingContext) {
        this.buffer = GL.createBuffer();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.buffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.data), GL.STATIC_DRAW);
    }

    bindBuffer(GL: WebGL2RenderingContext) {
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.buffer);
    }
}