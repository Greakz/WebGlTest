import { Shader } from './Shader';

export abstract class LightShader extends Shader {
    shader_identifier: string = 'light';
    constructor() {
        super();
    }
    uf_light_block_binding: number;
    bindLightUniformLocations(GL: WebGL2RenderingContext) {
        this.uf_light_block_binding = GL.getUniformBlockIndex(this.compiledProgram, 'light');
        GL.uniformBlockBinding(this.compiledProgram, this.uf_light_block_binding, 0);
    }
    bindUniformLocations(GL: WebGL2RenderingContext) {}
    bindAttributeLocations(GL: WebGL2RenderingContext) {}
}