import { MousePosition } from './MousePosition';
import { Vec2 } from '../Math/Vector/vec';
import { Log } from './Log';
import LogSingleton from './LogSingleton';

var Mouse = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): MousePosition {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */

        var Log: Log = LogSingleton.getInstance();
        var x: number = 0;
        var y: number = 0;

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
            function bindListener() {
                const overlay: HTMLElement | null = document.getElementById('overlay');
                if(overlay === null) {
                    Log.error('Mouse', 'Cant find overlay to track!')
                }
                overlay.addEventListener('mousemove', (e) => {
                    x = e.clientX;
                    y = e.clientY;
                });
            }

        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        return {
            init() {
                bindListener();
            },
            get(): Vec2 {
                return {x: x, y: y}
            },
            getLeftStatus(): boolean {
                return false;
            },
            getRightStatus(): boolean {
                return false;
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): MousePosition {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default Mouse;
