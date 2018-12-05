import { ArrayBufferData } from '../DataArrays/ArrayBufferData';
import { Asset } from '../Asset/Asset';
import { HasProvider } from '../../../Singleton/HasSingletons';
import { Shader } from '../../../Shader/Shader';

export class TextureMap extends HasProvider {

    /**
     * Define these!
     */
    slot: number;
    uf_target_name: string;
    asset: Asset;
    attribute_pointer_name: string;
    coordinates: ArrayBufferData;

    /**
     * Fill these by call createModel on the model
     */
    uf_target: WebGLUniformLocation;
    attribute_pointer: number;

    /**
     * Function to Overwrite
     * @param {WebGL2RenderingContext} GL
     * @param {Shader} shader
     */
    loadAttributePoiner(GL: WebGL2RenderingContext, shader: Shader) {
        this.attribute_pointer = GL.getAttribLocation(shader.getProgram(), this.attribute_pointer_name);
    }

    /**
     * Function to Overwrite
     * @param {WebGL2RenderingContext} GL
     * @param {Shader} shader
     */
    loadUniformLocation(GL: WebGL2RenderingContext, shader: Shader) {
        const location: WebGLUniformLocation | null = GL.getUniformLocation(shader.getProgram(), this.uf_target_name);
        if(location === null) {
            TextureMap.Log.error('TextureMap', 'Could not load Uniform-Location: ' + this.uf_target_name);
        }
        this.uf_target = location;
    }

    createTexture(GL: WebGL2RenderingContext) {
        this.coordinates.createBuffer(GL);
    }

    bindTexture(GL: WebGL2RenderingContext) {
        this.asset.bindTexture(GL, this.uf_target, this.slot)
    }

    bindBuffer(GL: WebGL2RenderingContext) {
        this.coordinates.bindBuffer(GL);
    }

    setAttributePointer(GL: WebGL2RenderingContext) {
        this.coordinates.setAttributePointer(GL, this.attribute_pointer);
    }

}