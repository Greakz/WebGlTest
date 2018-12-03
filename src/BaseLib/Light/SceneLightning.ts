import { AmbientLight } from './AmbientLight';
import { DirectionalLight } from './DirectionalLight';
import { PunctualLight } from './PunctualLight';
import { LightShader } from '../Shader/LightShader';
import { HasLog } from '../Singleton/HasSingletons';

export class SceneLightning extends HasLog {

    ambient_lights: AmbientLight[] = [];
    directional_lights: DirectionalLight[] = [];
    punctual_lights: PunctualLight[] = [];

    private directional_light_directions: Float32Array = new Float32Array(12);
    private directional_light_colors: Float32Array = new Float32Array(16);
    private directional_lights_count: number = 0;

    addAmbientLight(ambient_light: AmbientLight) {
        this.ambient_lights.push(ambient_light);
    }
    addDirectionalLight(directional_light: DirectionalLight) {
        this.directional_lights.push(directional_light);
        this.updateDirectionalLights();
    }
    addPunctualLight(puctual_light: PunctualLight) {
        this.punctual_lights.push(puctual_light);
    }

    updateDirectionalLights() {
        if(this.directional_lights.length < 4) {
            let colors: number[] = [];
            let directions: number[] = [];
            for(let i = 0; i < 4; i++) {
                if(i < this.directional_lights.length) {
                    colors.push(this.directional_lights[i].color.x);
                    colors.push(this.directional_lights[i].color.y);
                    colors.push(this.directional_lights[i].color.z);
                    colors.push(this.directional_lights[i].color.w);
                    directions.push(this.directional_lights[i].direction.x);
                    directions.push(this.directional_lights[i].direction.y);
                    directions.push(this.directional_lights[i].direction.z);
                } else {
                    for(let j = 0; j < 3; j++) {
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

    updateSelfAndChiildren(time: number) {
        this.update(time);
        this.ambient_lights.forEach((al: AmbientLight) => al.update(time));
        this.directional_lights.forEach((al: DirectionalLight) => al.update(time));
        this.punctual_lights.forEach((al: PunctualLight) => al.update(time));
    }

    update(time: number) {}

    setUniformSceneLightning(GL: WebGL2RenderingContext, shader: LightShader) {
        this.setUniformAmbientLight(GL, shader);
    }

    setUniformAmbientLight(GL: WebGL2RenderingContext, shader: LightShader) {
        GL.uniform1fv(shader.uf_directional_light_directions, this.directional_light_directions);
        GL.uniform1fv(shader.uf_directional_light_colors, this.directional_light_colors);
        GL.uniform1i(shader.uf_directional_lights_count, this.directional_lights_count);
    }

}