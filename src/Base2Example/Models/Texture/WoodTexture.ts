import { TextureShader } from '../../Shader/TextureShader';
import { Texture } from '../../../Base2/Object/Model/Texture/Texture';

export class WoodTexture extends Texture {
    texture_identifier: string = 'wood';

    protected asset_file: string = 'wood.png';
    private loaded: boolean = false;
    protected texture_coordinates: number[] = [
        // vorne
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // hinten
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // oben
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // unten
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // rechts
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // links
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    buffer: WebGLBuffer;
    texture: WebGLTexture;

    vaoExtension(GL: WebGL2RenderingContext, shader: TextureShader) {
        this.buffer = GL.createBuffer();
        GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.texture_coordinates), GL.STATIC_DRAW);
        GL.vertexAttribPointer(shader.texture_position, 2, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(shader.texture_position);
    }

    bindTexture(GL: WebGL2RenderingContext, shader: TextureShader) {
        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.uniform1i(shader.uf_uSample, 0);
    }
}