import { VAOProvider } from './VAOProvider';
import { Vao } from '../Object/Model/VAO/Vao';
import { Canvas } from './Canvas';
import CanvasSingleton from './CanvasSingleton';
import { Shader } from '../Shader/Shader';
import { Log } from './Log';
import LogSingleton from './LogSingleton';

var VAOProviderSingleton = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): VAOProvider {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var Log: Log = LogSingleton.getInstance();
        var Canvas: Canvas = CanvasSingleton.getInstance();
        var vaos: Vao<Shader>[] = [];

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function getVaoOrCreate<T extends Vao<Shader>>(vao: T): T {
            for (let i = 0; i < vaos.length; i++) {
                if (vaos[i].vao_identifier === vao.vao_identifier) {
                    return (vaos[i] as any);
                }
            }
            return initVao(vao);
        }

        function initVao<T extends Vao<Shader>>(vao: T): T {
            vao.init(Canvas.getGl(), vao.shader);
            vaos.push(vao);
            Log.info('VaoProvider', 'Created Vao: ' + vao.vao_identifier + '!');
            return vao;
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        Log.info('VaoProvider', 'VAO Provider initialised!');
        return {
            getVao<T extends Vao<Shader>>(vao: T): T {
               return getVaoOrCreate(vao);
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): VAOProvider {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default VAOProviderSingleton;
