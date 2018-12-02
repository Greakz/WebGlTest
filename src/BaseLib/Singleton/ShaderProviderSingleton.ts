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
                    return current;
                }
            }
            return initNewShader(shader);
        }

        function initNewShader<T extends Shader>(shader: T): T {
            Log.info('ShaderProvider', 'Missing Shader: ' + shader.shader_identifier + '!');
            ShaderLoader.readTextFile(
                shader.shader_identifier,
                (compiledProgram: WebGLProgram, gl: WebGL2RenderingContext) => {
                    shader.setProgram(compiledProgram, gl);
                    loaded_shaders.push({
                        shader: shader,
                        identifier: shader.shader_identifier,
                    });
                    console.log('in async')
                }
            );
            console.log('behind async')
            return shader;
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        Log.info('ShaderProvider', 'Shader Provider initialised!');
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
