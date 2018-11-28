import { VAOProvider } from './VAOProvider';
import { Vao } from '../Object/Model/VAO/Vao';
import { Canvas } from './Canvas';
import CanvasSingleton from './CanvasSingleton';
import { Shader } from '../Shader/Shader';

var VAOProviderSingleton = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): VAOProvider {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var Canvas: Canvas = CanvasSingleton.getInstance();
        var vaos: Vao<Shader>[] = [];

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function getVaoOrCreate(vao: Vao<Shader>): Vao<Shader> {
            for (let i = 0; i < vaos.length; i++) {
                if (vaos[i].vao_identifier === vao.vao_identifier) {
                    return vaos[i];
                }
            }
            return initVao(vao);
        }

        function initVao(vao: Vao<Shader>): Vao<Shader> {
            vao.init(Canvas.getGl(), vao.shader);
            vaos.push(vao);
            return vao;
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        return {
            getVao(vao: Vao<Shader>): Vao<Shader> {
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
