import { ShaderLoader } from '../ShaderLoader';
import { mat4FromTranslationRotationScale, quaternionFromEuler } from '../missUtil';
const mat4 = require('gl-mat4');
const quat = require('gl-quat');

export class DrawObject {

    constructor() {
    }

    // Vertex Points Attributes
    protected vertexPoints: number[] = [];

    setVertexPoints(vertexPoints: number[]) {
        this.vertexPoints = vertexPoints;
    }

    getVertexPoints(): number[] {
        return this.vertexPoints;
    }

    // Vertex Indices Attributes
    protected vertexIndices: Uint16Array = new Uint16Array([]);

    setVertexIndices(vertexIndices: Int16Array) {
        this.vertexIndices = vertexIndices;
    }

    getVertexIndices(): Uint16Array {
        return this.vertexIndices;
    }

    // Vertex Color Attributes
    protected vertexColors: number[] = [];

    setVertexColors(vertexColors: number[]) {
        this.vertexColors = vertexColors;
    }

    getVertexColors(): number[] {
        return this.vertexColors;
    }

    // Object Buffer
    protected indexBuffer: WebGLBuffer;
    protected dataBuffer: WebGLBuffer;

    buildBuffers(gl: WebGLRenderingContext): void {
        // build Color Buffer
        const dataBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPoints), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        // build Index Buffer
        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        this.dataBuffer = dataBuffer;
        this.indexBuffer = indexBuffer;
    }

    getIndexBuffer(): WebGLBuffer {
        return this.indexBuffer;
    }

    getColorBuffer(): WebGLBuffer {
        return this.dataBuffer;
    }

    //ShaderProgram
    protected shaderProgram: WebGLProgram;

    loadShaderProgram(shader_vs: string, shader_fs: string, gl: WebGLRenderingContext) {
        const shaderVS = ShaderLoader.loadShaderFromDom(shader_vs, gl);
        const shaderFS = ShaderLoader.loadShaderFromDom(shader_fs, gl);

        let shaderProgram: WebGLProgram | null = gl.createProgram();
        if (shaderProgram !== null) {
            gl.attachShader(shaderProgram, shaderVS);
            gl.attachShader(shaderProgram, shaderFS);
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                throw Error;
            }

            const projectionMatrixUniformLocation: WebGLUniformLocation =
                gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
            const modelViewMatrixUniformLocation: WebGLUniformLocation =
                gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
            const colorUniformLocation: WebGLUniformLocation =
                gl.getUniformLocation(shaderProgram, 'cubeColor');
            const aVertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');

            this.projectionMatrixUniformLocation = projectionMatrixUniformLocation;
            this.modelViewMatrixUniformLocation = modelViewMatrixUniformLocation;
            this.aVertexPosition = aVertexPosition;
            this.colorUniformLocation = colorUniformLocation;
            this.shaderProgram = shaderProgram;
        } else {
            throw Error;
        }
    }

    setProgram(shaderProgram: WebGLProgram): void {
        this.shaderProgram = shaderProgram;
    }

    getProgram(): WebGLProgram {
        return this.shaderProgram;
    }

    protected rotation: Float32Array = new Float32Array([0, 0, 45]);
    protected scaling: Float32Array = new Float32Array([1, 1, 1]);
    protected translation: Float32Array = new Float32Array([0, 0, 0]);
    protected projectionMatrixUniformLocation: WebGLUniformLocation;
    protected modelViewMatrixUniformLocation: WebGLUniformLocation;
    protected aVertexPosition: number;
    protected colorUniformLocation: WebGLUniformLocation;

    getModelViewMatrix() {
        const rotationsQuaternion = quaternionFromEuler(this.rotation[0], this.rotation[1], this.rotation[2]);
        return mat4FromTranslationRotationScale(
            rotationsQuaternion,
            this.translation,
            this.scaling
        );
    }

    draw(gl: WebGLRenderingContext, time: number, projectionMatrix: Float32Array) {
        // buffer color and point data
        gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffer);
        // tell where point info are
        gl.vertexAttribPointer(this.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.aVertexPosition);

        // buffer indices data
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        mat4.translate(projectionMatrix, projectionMatrix, this.translation);

        this.scaling[1] = (Math.sin(time * 0.0005) + 1) / 5 + 0.2;
        this.scaling[0] = (Math.sin(time * 0.0005) + 1) / 5 + 0.2;
        this.scaling[2] = (Math.sin(time * 0.0005) + 1) / 5 + 0.2;
        this.rotation[1] = (Math.sin(time * 0.0005)) * 180;
        this.rotation[2] = (Math.sin(time * 0.0005)) * 180;
        //this.rotation[1] = (time * 0.05);
        gl.useProgram(this.shaderProgram);

        gl.uniformMatrix4fv(
            this.projectionMatrixUniformLocation,
            false,
            projectionMatrix);
        gl.uniform4fv(
            this.colorUniformLocation,
            new Float32Array([0.7, 1.0, 0.5, 1.0]));
        gl.uniformMatrix4fv(
            this.modelViewMatrixUniformLocation,
            false,
            this.getModelViewMatrix());

        gl.drawElements(gl.TRIANGLES, this.vertexIndices.length, gl.UNSIGNED_SHORT, 0);
    }


}