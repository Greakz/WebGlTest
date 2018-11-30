import { Shader } from '../../../Shader/Shader';

export abstract class Texture {
    texture_identifier: string = 'default';
    private inittexture = false;

    protected asset_file: string = 'wood.png';
    protected texture_coordinates: number[] = [];
    protected buffer: WebGLBuffer;
    protected texture: WebGLTexture;

    isReady(): boolean {
        return this.inittexture;
    }

    loadTexture(GL: WebGL2RenderingContext) {
        let cubeImage = new Image();
        console.log('loadTexture')
        this.texture = GL.createTexture();
        const level = 0;
        const internalFormat = GL.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = GL.RGBA;
        const srcType = GL.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.texImage2D(GL.TEXTURE_2D, 0, internalFormat, width, height, border, srcFormat, srcType, pixel);
        this.inittexture = true;

        cubeImage.onload = () => this.bufferTexture(GL, cubeImage);
        cubeImage.src = './Assets/' + this.asset_file;
    }

    protected bufferTexture(GL: WebGL2RenderingContext, image: HTMLImageElement) {
        this.texture = GL.createTexture();
        // GL.enable(GL.TEXTURE_2D);
        console.log('buffer texture')
        GL.bindTexture(GL.TEXTURE_2D, this.texture);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
        // GL.generateMipmap(GL.TEXTURE_2D);
    }

    vaoExtension(GL: WebGL2RenderingContext, shader: Shader) {

    }

    bindTexture(GL: WebGL2RenderingContext, shader: Shader) {

    }

}