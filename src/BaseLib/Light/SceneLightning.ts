import { AmbientLight } from './AmbientLight';
import { DirectionalLight } from './DirectionalLight';
import { OmniLight } from './OmniLight';
import { LightShader } from '../Shader/LightShader';
import { HasCanvas, HasLog } from '../Singleton/HasSingletons';
import { Light } from './Light';
import { SpotLight } from './SpotLight';
import { Camera } from '../Camera/Camera';
import { Vec3 } from '../Math/Vector/vec';
import { Material } from '../Object/Model/Material/Material';

const maxAmbientLights: number = 2;
const maxDirectionalLights: number = 8;
const maxOmniLights: number = 32;
const maxSpotLights: number = 32;

export class SceneLightning extends HasCanvas {

    light_ubo: SceneLightUbo;

    camera_pos: Vec3 = {x: 0.0, y: 0.0, z: 0.0};

    ambient_lights: AmbientLight[] = [];
    directional_lights: DirectionalLight[] = [];
    omni_lights: OmniLight[] = [];
    spot_lights: SpotLight[] = [];

    private directional_light_directions: Float32Array = new Float32Array(12);
    private directional_light_colors: Float32Array = new Float32Array(16);
    private directional_lights_count: number = 0;

    updateCamPos(cam: Camera) {
        this.camera_pos = cam.getPosition();
    }

    addSceneLight(light: Light) {
        light.setSceneLightning(this);
        if (light instanceof OmniLight) {
            if (this.omni_lights.length < maxOmniLights) {
                this.omni_lights.push(light);
            }
        } else if (light instanceof SpotLight) {
            if (this.spot_lights.length < maxSpotLights) {
                this.spot_lights.push(light);
            }
        } else if (light instanceof DirectionalLight) {
            if (this.directional_lights.length < maxDirectionalLights) {
                this.directional_lights.push(light);
            }
            this.updateDirectionalLights();
        } else if (light instanceof AmbientLight) {
            if (this.ambient_lights.length < maxAmbientLights) {
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
            this.camera_pos,
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
        GL.bufferData(GL.UNIFORM_BUFFER, new Float32Array(1892), GL.DYNAMIC_DRAW);
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
        // push propagation behaviors
        this.ubo_data_build.push(l.constant);
        this.ubo_data_build.push(l.linear);
        this.ubo_data_build.push(l.quadratic);
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

    private pushEmptyVec4s(count?: number) {
        let c = (count !== undefined) ? count : 1;
        for(let i = 0; i < (c * 4); i++) {
            this.ubo_data_build.push(0.0);
        }
    }

    updateMaterial(GL: WebGL2RenderingContext, material: Material) {
        const offset : number = 16; // skip camera;
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.ubo_buffer);
        GL.bufferSubData(GL.UNIFORM_BUFFER, offset, material.buildBufferArrayData(), 0, null);
        GL.bindBuffer(GL.UNIFORM_BUFFER, null);
    }

    update(GL: WebGL2RenderingContext,
           cam_pos: Vec3,
           amb_l: AmbientLight[],
           dir_l: DirectionalLight[],
           omn_l: OmniLight[],
           spo_l: SpotLight[]) {
        this.ubo_data_build = [];

        // push Camera Position
        this.ubo_data_build.push(cam_pos.x);
        this.ubo_data_build.push(cam_pos.y);
        this.ubo_data_build.push(cam_pos.z);
        this.ubo_data_build.push(0.0);

        // push Material Dummy
        this.pushEmptyVec4s(4);

        //AmbientLights
        for (let i = 0; i < maxAmbientLights; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (amb_l.length > i) {
                this.pushAmbientLight(amb_l[i]);
            } else {
                this.pushEmptyVec4s();
            }
        }
        //DirectionalLights
        for (let i = 0; i < maxDirectionalLights; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (dir_l.length > i) {
                this.pushDirectionalLight(dir_l[i]);
            } else {
                this.pushEmptyVec4s(5);
            }
        }
        //OmniLights
        for (let i = 0; i < maxOmniLights; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (omn_l.length > i) {
                this.pushOmniLight(omn_l[i]);
            } else {
                this.pushEmptyVec4s(6);
            }
        }
        //OmniLights
        for (let i = 0; i < maxSpotLights; i++) {
            // push one Chunk (ambient Light is only one Chunk
            if (spo_l.length > i) {
                this.pushSpotLight(spo_l[i]);
            } else {
                this.pushEmptyVec4s(7);
            }
        }
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.ubo_buffer);
        GL.bufferData(GL.UNIFORM_BUFFER, new Float32Array(this.ubo_data_build), GL.DYNAMIC_DRAW);
        GL.bindBuffer(GL.UNIFORM_BUFFER, null);
    }

    bind(GL: WebGL2RenderingContext, shader: LightShader) {
        GL.bindBufferBase(GL.UNIFORM_BUFFER, 0, this.ubo_buffer);
    }
}