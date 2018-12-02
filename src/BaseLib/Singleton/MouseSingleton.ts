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
        var leftStatus: boolean = false;
        var rightStatus: boolean = false;
        var wheel: number = 0;

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
                overlay.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                });
                overlay.addEventListener('mousedown', (e: any) => {
                    let isRightMB;
                    if ('which' in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                        isRightMB = e.which == 3;
                    else if ('button' in e)  // IE, Opera
                        isRightMB = e.button == 2;

                    if (isRightMB) {
                        rightStatus = true;
                    } else {
                        leftStatus = true;
                    }
                });
                overlay.addEventListener('mouseup', (e: any) => {
                    let isRightMB;
                    if ('which' in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                        isRightMB = e.which == 3;
                    else if ('button' in e)  // IE, Opera
                        isRightMB = e.button == 2;

                    if (isRightMB) {
                        rightStatus = false;
                    } else {
                        leftStatus = false;
                    }
                });

            }

            function bindNewLister(cllbck: (delta: number) =>void){
                const overlay: HTMLElement | null = document.getElementById('overlay');
                if(overlay === null) {
                    Log.error('Mouse', 'Cant find overlay to add wheel event!')
                }
                overlay.addEventListener('wheel', (e: any) => cllbck(e.deltaY));
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
                return leftStatus;
            },
            getRightStatus(): boolean {
                return rightStatus;
            },
            addScrollEvent(cllbck: (delta: number) =>void): void {
                bindNewLister(cllbck);
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
