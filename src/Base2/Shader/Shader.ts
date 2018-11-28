abstract class ShaderCore {
    protected vertexShader: WebGLShader;
    protected fragmentShader: WebGLShader;
    protected compiledProgram: WebGLProgram;
    setProgram(vs: WebGLShader, fs: WebGLShader, cp: WebGLProgram, GL: WebGL2RenderingContext) {
        this.vertexShader = vs;
        this.fragmentShader = fs;
        this.compiledProgram = cp;
        this.bindUniformLocations(GL);
        this.bindAttributeLocations(GL);
    }
    getProgram(): WebGLProgram {
        return this.compiledProgram;
    }
    bindUniformLocations(GL: WebGL2RenderingContext) {}
    bindAttributeLocations(GL: WebGL2RenderingContext) {}
}


export abstract class Shader extends ShaderCore {
    shader_identifier: string = 'default';
    constructor() {
        super();
    }

    bindUniformLocations(GL: WebGL2RenderingContext) {}
    bindAttributeLocations(GL: WebGL2RenderingContext) {}
}