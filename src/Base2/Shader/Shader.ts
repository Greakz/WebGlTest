abstract class ShaderCore {
    protected vertexShader: WebGLShader;
    protected fragmentShader: WebGLShader;
    protected compiledProgram: WebGLProgram;
    setProgram(vs: WebGLShader, fs: WebGLShader, cp: WebGLProgram, GL: WebGLRenderingContext) {
        this.vertexShader = vs;
        this.fragmentShader = fs;
        this.compiledProgram = cp;
        this.bindUniformLocations(GL);
        this.bindAttributeLocations(GL);
    }
    getProgram(): WebGLProgram {
        return this.compiledProgram;
    }
    bindUniformLocations(GL: WebGLRenderingContext) {}
    bindAttributeLocations(GL: WebGLRenderingContext) {}
}


export class Shader extends ShaderCore {
    shader_identifier: string = 'default';

    constructor() {
        super();
    }

    uf_modelMatrix: WebGLUniformLocation;
    bindUniformLocations(GL: WebGLRenderingContext) {
        this.uf_modelMatrix = GL.getUniformLocation(this.compiledProgram, "modelMatrix");
    }
    attr_position: number;
    bindAttributeLocations(GL: WebGLRenderingContext) {
        this.attr_position = GL.getAttribLocation(this.compiledProgram, "vertexPosition");
    }
}