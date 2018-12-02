export class ArrayBufferData {
    buffer: WebGLBuffer;
    data: number[];
    component_size: number;

    constructor(data: number[], componentSize: number) {
        this.data = data;
        this.component_size = componentSize;
    }

    createBuffer(GL: WebGL2RenderingContext) {
        this.buffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.data), GL.STATIC_DRAW);
    }

    bindBuffer(GL: WebGL2RenderingContext) {
        GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
    }

    setAttributePointer(GL: WebGL2RenderingContext, attribute_position: number) {
        GL.vertexAttribPointer(attribute_position, this.component_size, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(attribute_position);
    }
}