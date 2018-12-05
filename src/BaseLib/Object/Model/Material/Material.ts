import { Vec3 } from '../../../Math/Vector/vec';
import { HasCanvas } from '../../../Singleton/HasSingletons';

export class Material extends HasCanvas {
    ambient: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    diffuse: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    specular: Vec3 = {x: 1.0, y: 1.0, z: 1.0};
    shininess: number = 1.0;

    /*
    private buffer: WebGLBuffer;
    initUniformBuffer() {
        this.buffer = Material.Canvas.getGl().createBuffer();
        this.updateUniformBuffer();
    }
    updateUniformBuffer() {
        const GL = Material.Canvas.getGl();
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.buffer);
        GL.bufferData(GL.UNIFORM_BUFFER, this.buildUniformArray(), GL.DYNAMIC_DRAW);
        GL.bindBuffer(GL.UNIFORM_BUFFER, null)
    }*/
    buildBufferArrayData(): Float32Array {
        return new Float32Array([
            this.ambient.x,
            this.ambient.y,
            this.ambient.z,
            0.0,
            this.diffuse.x,
            this.diffuse.y,
            this.diffuse.z,
            0.0,
            this.specular.x,
            this.specular.y,
            this.specular.z,
            0.0,
            this.shininess,
            0.0, 0.0, 0.0
        ])
    }
    /*
    bindUniformBuffer(GL: WebGL2RenderingContext, shader: LightShader) {
        GL.bindBufferBase(GL.UNIFORM_BUFFER, 0, this.buffer);
    }
    */
}