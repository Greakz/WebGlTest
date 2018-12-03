import { LightShader } from '../../BaseLib/Shader/LightShader';

export class TextureShader extends LightShader {
    shader_identifier: string = 'texture';

    constructor() {
        super();
    }
    uf_modelMatrix: WebGLUniformLocation;
    uf_projectionMatrix: WebGLUniformLocation;
    uf_uSample: WebGLUniformLocation;
    uf_color: WebGLUniformLocation;
    bindUniformLocations(GL: WebGL2RenderingContext) {
        this.bindLightUniformLocations(GL);
        this.uf_modelMatrix = GL.getUniformLocation(this.compiledProgram, "modelMatrix");
        this.uf_projectionMatrix = GL.getUniformLocation(this.compiledProgram, "viewMatrix");
        this.uf_uSample = GL.getUniformLocation(this.compiledProgram, "uSampler");
        this.uf_color = GL.getUniformLocation(this.compiledProgram, "color");
    }
    attr_position: number;
    normals_position: number;
    texture_position: number;
    bindAttributeLocations(GL: WebGL2RenderingContext) {
        this.attr_position = GL.getAttribLocation(this.compiledProgram, "vertexPosition");
        this.normals_position = GL.getAttribLocation(this.compiledProgram, "vertexNormals");
        this.texture_position = GL.getAttribLocation(this.compiledProgram, "aTextureCoord");
    }
}