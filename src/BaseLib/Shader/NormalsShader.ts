import { Shader } from './Shader';

export class NormalsShader extends Shader {
    shader_identifier: string = 'normals';
    constructor() {
        super();
    }
    modelMatrix: WebGLUniformLocation;
    projectionMatrix: WebGLUniformLocation;
    bindModelProjectionMatrixUniforms(GL: WebGL2RenderingContext) {
        this.modelMatrix = GL.getUniformLocation(this.compiledProgram, 'modelMatrix');
        this.projectionMatrix = GL.getUniformLocation(this.compiledProgram, 'projectionMatrix');
    }
    attr_position: number;
    attr_normal: number;
    bindPositionNormalAttributes(GL: WebGL2RenderingContext) {
        this.attr_position = GL.getAttribLocation(this.compiledProgram, 'vertexPosition');
        this.attr_normal = GL.getAttribLocation(this.compiledProgram, 'vertexNormals');
    }
    bindUniformLocations(GL: WebGL2RenderingContext) {
        this.bindModelProjectionMatrixUniforms(GL);
    }
    bindAttributeLocations(GL: WebGL2RenderingContext) {
        this.bindPositionNormalAttributes(GL);
    }
}