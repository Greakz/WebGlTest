import { MousePosition } from './MousePosition';
import { Vec2 } from '../Math/Vector/vec';
import { mouseInstance } from '../../index';
import { Hitable } from '../Object/Model/Hitable';
import { Ray } from '../Math/Ray/Ray';

var Mouse = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): MousePosition {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */

        var x: number = 0;
        var y: number = 0;

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
            function bindListener() {
                const overlay: HTMLElement = document.getElementById('overlay');
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
                return {x: 0, y: 0}
            },
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
