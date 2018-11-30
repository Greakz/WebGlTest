import { VAOProvider } from './VAOProvider';
import { Vao } from '../Object/Model/VAO/Vao';
import { Canvas } from './Canvas';
import CanvasSingleton from './CanvasSingleton';
import { Shader } from '../Shader/Shader';
import { Log } from './Log';
import LogSingleton from './LogSingleton';
import { TextureProvider } from './TextureProvider';
import { Texture } from '../Object/Model/Texture/Texture';

var VAOProviderSingleton = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): TextureProvider {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var Log: Log = LogSingleton.getInstance();
        var Canvas: Canvas = CanvasSingleton.getInstance();
        var textures: Texture[] = [];

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function getOrCreateTexture<T extends Texture>(texture: T): T {
            for (let i = 0; i < textures.length; i++) {
                if (textures[i].texture_identifier === texture.texture_identifier) {
                    return (textures[i] as any);
                }
            }
            return initVao(texture);
        }

        function initVao<T extends Texture>(texture: T): T {
            texture.loadTexture(Canvas.getGl());
            textures.push(texture);
            Log.info('TextureProvider', 'Created Texture: ' + texture.texture_identifier+ '!');
            return texture;
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        Log.info('VaoProvider', 'VAO Provider initialised!');
        return {
            getTexture<T extends Texture>(texture: T): T {
               return getOrCreateTexture(texture);
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): TextureProvider {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default VAOProviderSingleton;
