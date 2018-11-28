import { ShaderProvider } from './ShaderProvider';
import { Shader } from '../Shader/Shader';
import { ShaderLoader } from './ShaderLoader.util';
import { Log } from './Log';
import LogSingleton from './LogSingleton';

interface LoadedShader {
    identifier: string,
    shader: Shader
}

var VBOProviderSingleton = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): ShaderProvider {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var loaded_shaders: LoadedShader[] = [];
        var Log: Log = LogSingleton.getInstance();
        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function getShaderNewOrExistant<T extends Shader>(shader: T): T {
            for (let i = 0; i < loaded_shaders.length; i++) {
                if (loaded_shaders[i].identifier === shader.shader_identifier) {
                    let current: T = (loaded_shaders[i].shader as any);
                    Log.info('ShaderProvider', 'Request successful: ' + shader.shader_identifier + '  (hit)');
                    return current;
                }
            }
            return initNewShader(shader);
        }

        function initNewShader<T extends Shader>(shader: T): T {
            Log.info('ShaderProvider', 'Missing Shader, call ShaderLoader!');
            ShaderLoader.readTextFile(
                shader.shader_identifier,
                (shaderContent: string) => {
                    ShaderLoader.shaderToDom(shaderContent, shader.shader_identifier);

                    ShaderLoader.attachAndLinkShader(shader);

                    loaded_shaders.push({
                        shader: shader,
                        identifier: shader.shader_identifier,
                    });
                }
            );
            Log.info('ShaderProvider', 'Request successful: ' + shader.shader_identifier + ' (miss)');
            return shader;
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        return {
            getShader<T extends Shader>(shader: T): T {
                return getShaderNewOrExistant(shader);
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): ShaderProvider {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default VBOProviderSingleton;
