import { Shader } from './Shader';

export abstract class LightShader extends Shader {
    shader_identifier: string = 'light';
    constructor() {
        super();
    }
    uf_directional_light_directions: WebGLUniformLocation;
    uf_directional_light_colors: WebGLUniformLocation;
    uf_directional_lights_count: WebGLUniformLocation;
    bindLightUniformLocations(GL: WebGL2RenderingContext) {
        this.uf_directional_light_directions = GL.getUniformLocation(this.compiledProgram, 'directionalLightDirections');
        this.uf_directional_light_colors = GL.getUniformLocation(this.compiledProgram, 'directionalLightColors');
        this.uf_directional_lights_count = GL.getUniformLocation(this.compiledProgram, 'directionalLightsCount');
    }
    bindUniformLocations(GL: WebGL2RenderingContext) {}
    bindAttributeLocations(GL: WebGL2RenderingContext) {}
}