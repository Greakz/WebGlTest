import { VBOProvider } from '../Provider/VBOProvider';

var VBOProviderSingleton = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): VBOProvider {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
        var dummy_attr: boolean = false;

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function dummyFunc() {
            // priv func
        }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        return {
            dummy() {
                // public func
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): VBOProvider {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default VBOProviderSingleton;
