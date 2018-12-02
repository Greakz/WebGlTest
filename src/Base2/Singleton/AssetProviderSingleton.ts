import { Canvas } from './Canvas';
import CanvasSingleton from './CanvasSingleton';
import { Log } from './Log';
import LogSingleton from './LogSingleton';
import { AssetProvider } from './AssetProvider';
import { Asset } from '../Object/Model2/Asset/Asset';

var AssetProviderSingleton = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): AssetProvider {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var Log: Log = LogSingleton.getInstance();
        var Canvas: Canvas = CanvasSingleton.getInstance();
        var assets: Asset[] = [];

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function getOrCreateAsset<T extends Asset>(asset: T): T {
            for (let i = 0; i < assets.length; i++) {
                if (assets[i].source === asset.source) {
                    return (assets[i] as any);
                }
            }
            return initAsset(asset);
        }

        function initAsset<T extends Asset>(asset: T): T {

            asset.loadTexture(Canvas.getGl());
            assets.push(asset);
            Log.info('AssetProvider', 'Created Asset: ' + asset.source);
            return asset;
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        Log.info('AssetProvider', 'Asset Provider initialised!');
        return {
            getAsset<T extends Asset>(asset: T): T {
               return getOrCreateAsset(asset);
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): AssetProvider {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default AssetProviderSingleton;
