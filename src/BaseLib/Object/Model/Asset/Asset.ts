import { HasLog } from '../../../Singleton/HasSingletons';

interface TextureOptions {

}

export abstract class Asset extends HasLog {
    /**
     * define this
     * @type {string}
     */
    source: string = '';

    static GetSlot(GL: WebGL2RenderingContext, slot: number) {
        switch (slot) {
            case 0: return GL.TEXTURE0;
            case 1: return GL.TEXTURE1;
            case 2: return GL.TEXTURE2;
            case 3: return GL.TEXTURE3;
            case 4: return GL.TEXTURE4;
            case 5: return GL.TEXTURE5;
            case 6: return GL.TEXTURE6;
            case 7: return GL.TEXTURE7;
            case 8: return GL.TEXTURE8;
            case 9: return GL.TEXTURE9;
            case 10: return GL.TEXTURE10;
        }
    }

    image: HTMLImageElement;
    texture: WebGLTexture;

    loadTexture(GL: WebGL2RenderingContext, options?: TextureOptions) {
        this.texture = GL.createTexture();
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        const loadingColor = new Uint8Array([82, 82, 82, 180]);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, 1, 1, 0, GL.RGBA, GL.UNSIGNED_BYTE, loadingColor);
        this.image = new Image();
        this.image.onload = () => {
            GL.bindTexture(GL.TEXTURE_2D, this.texture);
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this.image);
            // base settings, make it editable with textureoptions
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
            Asset.Log.info('Asset', 'Initialised Asset: ' + this.source);
        };
        this.image.src = './Assets/' + this.source;
    }

    bindTexture(GL: WebGL2RenderingContext, uf_shader_sampler_location: WebGLUniformLocation, slot: number) {
        GL.activeTexture(Asset.GetSlot(GL, slot));
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.uniform1i(uf_shader_sampler_location, slot);
    }
}