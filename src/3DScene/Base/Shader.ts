import { ShaderLoader } from './ShaderLoader';

export class Shader {
    protected shader_vs: string;
    protected shader_fs: string;
    protected vertexShader: WebGLShader;
    protected fragmentShader: WebGLShader;
    protected compiledProgram: WebGLProgram;

    constructor(shader_vs: string, shader_fs: string) {
        this.shader_fs = shader_fs;
        this.shader_vs = shader_vs;
    }

    attachAndLink(GL: WebGLRenderingContext) {
        this.vertexShader = ShaderLoader.loadShaderFromDom(this.shader_vs, GL);
        this.fragmentShader = ShaderLoader.loadShaderFromDom(this.shader_fs, GL);

        let shaderProgram: WebGLProgram = GL.createProgram();
        if (shaderProgram !== null) {
            this.compiledProgram = shaderProgram;

            GL.attachShader(this.compiledProgram, this.vertexShader);
            GL.attachShader(this.compiledProgram, this.fragmentShader);
            GL.linkProgram(this.compiledProgram);

            this.bindUniformLocations(GL);
        } else {
            throw Error;
        }
    }

    bindUniformLocations(GL: WebGLRenderingContext) {
        // Overwrite this method to store all Access Points
    }

    getProgram(): WebGLProgram {
        return this.compiledProgram;
    }
}