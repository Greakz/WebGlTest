import { Canvas } from './Canvas';
import CanvasSingleton from './CanvasSingleton';
import { Log } from './Log';
import LogSingleton from './LogSingleton';
import { MeshProvider } from './MeshProvider';
import { Mesh } from '../Object/Model/Mesh/Mesh';

var AssetProviderSingleton = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): MeshProvider {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var Log: Log = LogSingleton.getInstance();
        var Canvas: Canvas = CanvasSingleton.getInstance();
        var meshes: Mesh[] = [];

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function getOrCreateModel<T extends Mesh>(mesh: T): T {
            for (let i = 0; i < meshes.length; i++) {
                if (
                    meshes[i].mesh_identifier
                    === mesh.mesh_identifier
                ) {
                    return (meshes[i] as any);
                }
            }
            return initMesh(mesh);
        }

        function initMesh<T extends Mesh>(mesh: T): T {
            meshes.push(mesh);
            Log.info('MeshProvider', 'Created Mesh: ' + mesh.mesh_identifier);
            return mesh;
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        Log.info('MeshProvider', 'Model Provider initialised!');
        return {
            getMesh<T extends Mesh>(mesh: T): T {
               return getOrCreateModel(mesh);
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): MeshProvider {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default AssetProviderSingleton;
