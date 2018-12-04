import { Vec3 } from '../../../Math/Vector/vec';

export class Material {
    ambient: Vec3;
    diffuse: Vec3;
    specular: Vec3;
    shininess: number;

    private buffer: WebGLBuffer;
    initUniformBuffer(GL: WebGL2RenderingContext) {
        this.buffer = GL.createBuffer();
    }
    updateUniformBuffer(GL: WebGL2RenderingContext) {
        GL.bindBuffer(GL.UNIFORM_BUFFER, this.buffer);
        GL.bufferData(GL.UNIFORM_BUFFER, this.buildUniformArray(), GL.DYNAMIC_DRAW);
    }
    private buildUniformArray(): Float32Array {
        return new Float32Array([
            this.ambient.x,
            this.ambient.y,
            this.ambient.z,
            this.diffuse.x,
            this.diffuse.y,
            this.diffuse.z,
            this.specular.x,
            this.specular.y,
            this.specular.z,
            this.shininess
        ])
    }
}