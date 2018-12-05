import { AmbientLight } from './AmbientLight';
import { DirectionalLight } from './DirectionalLight';
import { OmniLight } from './OmniLight';
import { LightShader } from '../Shader/LightShader';
import { HasCanvas, HasLog } from '../Singleton/HasSingletons';
import { Light } from './Light';
import { SpotLight } from './SpotLight';

export class SceneLightning extends HasCanvas {

    light_ubo: SceneLightUbo;

    ambient_lights: AmbientLight[] = [];
    directional_lights: DirectionalLight[] = [];
    omni_lights: OmniLight[] = [];
    spot_lights: SpotLight[] = [];

    private directional_light_directions: Float32Array = new Float32Array(12);
    private directional_light_colors: Float32Array = new Float32Array(16);
    private directional_lights_count: number = 0;

    addSceneLight(light: Light) {
        light.setSceneLightning(this);
        if (light instanceof OmniLight) {
            if (this.omni_lights.length < 32) {
                this.omni_lights.push(light);
            }
        } else if (light instanceof SpotLight) {
            if (this.spot_lights.length < 32) {
                this.spot_lights.push(light);
            }
        } else if (light instanceof DirectionalLight) {
            if (this.directional_lights.length < 8) {
                this.directional_lights.push(light);
            }
            this.updateDirectionalLights();
        } else if (light instanceof AmbientLight) {
            if (this.ambient_lights.length < 2) {
                this.ambient_lights.push(light);
            }
        }
    }

    updateDirectionalLights() {
        if (this.directional_lights.length < 4) {
            let colors: number[] = [];
            let directions: number[] = [];
            for (let i = 0; i < 4; i++) {
                if (i < this.directional_lights.length) {
                    colors.push(this.directional_lights[i].color.x);
                    colors.push(this.directional_lights[i].color.y);
                    colors.push(this.directional_lights[i].color.z);
                    directions.push(this.directional_lights[i].direction.x);
                    directions.push(this.directional_lights[i].direction.y);
                    directions.push(this.directional_lights[i].direction.z);
                } else {
                    for (let j = 0; j < 3; j++) {
                        directions.push(0.0);
                        colors.push(0.0);
                    }
                    colors.push(0.0);
                }

            }
            this.directional_light_directions = new Float32Array(directions);
            this.directional_light_colors = new Float32Array(colors);
            this.directional_lights_count = this.directional_lights.length;
        } else {
            SceneLightning.Log.warning('SceneLightning', 'Added to many Directional Lights (Max: 4)');
        }
    }

    updateSelfAndChildren(time: number) {
        if (this.light_ubo === undefined) {
            this.light_ubo = new SceneLightUbo();
            this.light_ubo.init(SceneLightning.Canvas.getGl())
        }
        this.light_ubo.update(
            SceneLightning.Canvas.getGl(),
            this.ambient_lights,
            this.directional_lights,
            this.omni_lights,
            this.spot_lights
        );

        this.update(time);
        this.ambient_lights.forEach((al: AmbientLight) => al.update(time));
        this.directional_lights.forEach((al: DirectionalLight) => al.update(time));
        this.omni_lights.forEach((al: OmniLight) => al.update(time));
    }

    update(time: number) {
    }

    getLightUbo(): SceneLightUbo {
        return this.light_ubo;
    }

}

class SceneLightUbo {
    private ubo_data_build: number[];
    private ubo_buffer: WebGLBuffer;

    constructor() {
    }

    init(GL: WebGL2RenderingContext) {
        this.ubo_buffer = GL.createBuffer();
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.ubo_buffer);
        GL.bufferData(GL.UNIFORM_BUFFER, new Float32Array(102), GL.DYNAMIC_DRAW);
        GL.bindBuffer(GL.UNIFORM_BUFFER, null);
    }

    private pushAmbientLight(l: AmbientLight) {
        this.ubo_data_build.push(l.color.x);
        this.ubo_data_build.push(l.color.y);
        this.ubo_data_build.push(l.color.z);
        this.ubo_data_build.push(1.0);
    }

    private pushDirectionalLight(l: DirectionalLight) {
        //push direction
        this.ubo_data_build.push(l.direction.x);
        this.ubo_data_build.push(l.direction.y);
        this.ubo_data_build.push(l.direction.z);
        this.ubo_data_build.push(1.0);
        //push color
        this.ubo_data_build.push(l.color.x);
        this.ubo_data_build.push(l.color.y);
        this.ubo_data_build.push(l.color.z);
        this.ubo_data_build.push(0.0);
        //push ambient factor
        this.ubo_data_build.push(l.ambient.x);
        this.ubo_data_build.push(l.ambient.y);
        this.ubo_data_build.push(l.ambient.z);
        this.ubo_data_build.push(0.0);
        //push diffuse factor
        this.ubo_data_build.push(l.diffuse.x);
        this.ubo_data_build.push(l.diffuse.y);
        this.ubo_data_build.push(l.diffuse.z);
        this.ubo_data_build.push(0.0);
        //push specular factor
        this.ubo_data_build.push(l.specular.x);
        this.ubo_data_build.push(l.specular.y);
        this.ubo_data_build.push(l.specular.z);
        this.ubo_data_build.push(0.0);
    }

    private pushOmniLight(l: OmniLight) {
        //push position
        this.ubo_data_build.push(l.position.x);
        this.ubo_data_build.push(l.position.y);
        this.ubo_data_build.push(l.position.z);
        this.ubo_data_build.push(1.0);
        //push color
        this.ubo_data_build.push(l.color.x);
        this.ubo_data_build.push(l.color.y);
        this.ubo_data_build.push(l.color.z);
        this.ubo_data_build.push(0.0);
        //push ambient factor
        this.ubo_data_build.push(l.ambient.x);
        this.ubo_data_build.push(l.ambient.y);
        this.ubo_data_build.push(l.ambient.z);
        this.ubo_data_build.push(0.0);
        //push diffuse factor
        this.ubo_data_build.push(l.diffuse.x);
        this.ubo_data_build.push(l.diffuse.y);
        this.ubo_data_build.push(l.diffuse.z);
        this.ubo_data_build.push(0.0);
        //push specular factor
        this.ubo_data_build.push(l.specular.x);
        this.ubo_data_build.push(l.specular.y);
        this.ubo_data_build.push(l.specular.z);
        this.ubo_data_build.push(0.0);
    }

    private pushSpotLight(l: SpotLight) {
        //push position
        this.ubo_data_build.push(l.position.x);
        this.ubo_data_build.push(l.position.y);
        this.ubo_data_build.push(l.position.z);
        this.ubo_data_build.push(1.0);
        //push direction
        this.ubo_data_build.push(l.direction.x);
        this.ubo_data_build.push(l.direction.y);
        this.ubo_data_build.push(l.direction.z);
        this.ubo_data_build.push(0.0);
        //push cone Angle
        this.ubo_data_build.push(l.cone_angle.x);
        this.ubo_data_build.push(l.cone_angle.y);
        this.ubo_data_build.push(l.cone_angle.z);
        this.ubo_data_build.push(0.0);
        //push color
        this.ubo_data_build.push(l.color.x);
        this.ubo_data_build.push(l.color.y);
        this.ubo_data_build.push(l.color.z);
        this.ubo_data_build.push(0.0);
        //push ambient factor
        this.ubo_data_build.push(l.ambient.x);
        this.ubo_data_build.push(l.ambient.y);
        this.ubo_data_build.push(l.ambient.z);
        this.ubo_data_build.push(0.0);
        //push diffuse factor
        this.ubo_data_build.push(l.diffuse.x);
        this.ubo_data_build.push(l.diffuse.y);
        this.ubo_data_build.push(l.diffuse.z);
        this.ubo_data_build.push(0.0);
        //push specular factor
        this.ubo_data_build.push(l.specular.x);
        this.ubo_data_build.push(l.specular.y);
        this.ubo_data_build.push(l.specular.z);
        this.ubo_data_build.push(0.0);
    }

    private pushEmptyVec4() {
        this.ubo_data_build.push(0.0);
        this.ubo_data_build.push(0.0);
        this.ubo_data_build.push(0.0);
        this.ubo_data_build.push(0.0);
    }

    update(GL: WebGL2RenderingContext,
           amb_l: AmbientLight[],
           dir_l: DirectionalLight[],
           omn_l: OmniLight[],
           spo_l: SpotLight[]) {
        this.ubo_data_build = [];

        //AmbientLights
        for (let i = 0; i < 2; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (amb_l.length > i) {
                this.pushAmbientLight(amb_l[i]);
            } else {
                this.pushEmptyVec4();
            }
        }
        //DirectionalLights
        for (let i = 0; i < 8; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (dir_l.length > i) {
                this.pushDirectionalLight(dir_l[i]);
            } else {
                this.pushEmptyVec4(); // dir
                this.pushEmptyVec4(); // col
                this.pushEmptyVec4(); // amb
                this.pushEmptyVec4(); // diff
                this.pushEmptyVec4(); // spec
            }
        }
        //OmniLights
        for (let i = 0; i < 32; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (omn_l.length > i) {
                this.pushOmniLight(omn_l[i]);
            } else {
                this.pushEmptyVec4(); // pos
                this.pushEmptyVec4(); // col
                this.pushEmptyVec4(); // amb
                this.pushEmptyVec4(); // diff
                this.pushEmptyVec4(); // spec
            }
        }
        //OmniLights
        for (let i = 0; i < 32; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (spo_l.length > i) {
                this.pushSpotLight(spo_l[i]);
            } else {
                this.pushEmptyVec4(); // pos
                this.pushEmptyVec4(); // dir
                this.pushEmptyVec4(); // c_angle
                this.pushEmptyVec4(); // col
                this.pushEmptyVec4(); // amb
                this.pushEmptyVec4(); // diff
                this.pushEmptyVec4(); // spec
            }
        }
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.ubo_buffer);
        GL.bufferData(GL.UNIFORM_BUFFER, new Float32Array(this.ubo_data_build), GL.DYNAMIC_DRAW);
    }

    bind(GL: WebGL2RenderingContext, shader: LightShader) {
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.ubo_buffer);
        GL.bindBufferBase(GL.UNIFORM_BUFFER, shader.uf_light_block_binding, this.ubo_buffer);
    }
}