import LogSingleton from './LogSingleton';
import { Canvas } from './Canvas';
import { Log } from './Log';
import { MousePosition } from './MousePosition';
import MouseSingleton from './MouseSingleton';

var Canvas = (function () {
    /**
     *  STORE THE INSTANCE
     */
    var instance;

    function init(): Canvas {

        /**
         *  PRIVATE ATTRIBUTES OF THE SINGLETON
         */
            // canvas Base Storage
        var Mouse: MousePosition = MouseSingleton.getInstance();
        var Log: Log = LogSingleton.getInstance();
        var canvas: HTMLCanvasElement;
        var gl: WebGL2RenderingContext;

        //renderLoopThings
        var fps: number;
        var interval: number;
        var clickListenerDiv: string = 'overlay';

        var updateFunc: (time: number) => void;
        var renderFunc: (GL: WebGL2RenderingContext) => void;

        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function initDom() {
            const content: string = '<div id="container"><canvas id="canvas" /></div><div id="fps"></div><div id="overlay"></div>';
            const root: HTMLElement | null = document.getElementById('root');
            if (root === null) {
                Log.error('Canvas', 'Cant find root node!', true);
            } else {
                root.innerHTML = content;
            }
        }

        function setNewFps(newFps: number) {
            fps = newFps;
            interval = 1000 / fps;
        }

        function adjustSize() {
            const newHeight = document.getElementById('container').clientHeight;
            const newWidth = document.getElementById('container').clientWidth;
            canvas.height = newHeight;
            (canvas as any).width = newWidth;
            gl.viewport(0, 0, newWidth, newHeight);
        }

        function initC() {
            initDom();
            setNewFps(40);
            canvas = document.querySelector('#canvas');
            gl = canvas.getContext('webgl2');
            window.addEventListener('resize', () => adjustSize());
            adjustSize();
            Mouse.init();
            Log.info('Canvas', 'Initialised Successfully...')
        }

        var lastTime: number = (new Date()).getTime();
        var measuredFps = 0;
        var framesInThisSecond = 0;
        var lastSeconds = (new Date()).getSeconds();
        var second = (new Date()).getSeconds();
        function loop() {
            window.requestAnimationFrame(loop);
            let currentTime = (new Date()).getTime();
            let delta = (currentTime - lastTime);
            second = (new Date()).getSeconds();

            if (delta > interval) {

                // let the engine roll...!
                updateFunc(currentTime);
                renderFunc(gl);


                if(lastSeconds === second) {
                    framesInThisSecond++;
                }else {
                    measuredFps = framesInThisSecond;
                    framesInThisSecond = 1;
                    lastSeconds = second;
                    displayFps();
                }

                lastTime = currentTime - (delta % interval);
            }
        }

        function displayFps() {
            document.getElementById('fps').innerHTML = 'FPS:' + measuredFps.toString();
        }
        /**
         *  PUBLIC METHODS OF THE SINGLETON
         */
        return {

            init() {
                Log.info('Canvas', 'Initialise Application...');
                initC();
            },

            setFps(fps: number) {
                setNewFps(fps);
            },

            getMeasuredFps(): number {
                return measuredFps;
            },

            setClickListenerPlane(newDivListener: string) {
                clickListenerDiv = newDivListener;
            },

            getClickListenerPlane(): string {
                return clickListenerDiv;
            },

            startApplication(updateFunction: (time: number) => void, renderFunction: (GL: WebGL2RenderingContext) => void) {
                Log.info('Canvas', 'Starting Application...');
                renderFunc = renderFunction;
                updateFunc = updateFunction;
                loop();
            },

            getGl(): WebGL2RenderingContext {
                return gl;
            }
        };
    }

    /**
     *  CREATOR FUNCTION TO GET THE SAME INSTANCE OF THE SINGLETON!
     */
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (): Canvas {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
export default Canvas;
