import LogSingleton from './LogSingleton';
import { Canvas } from './Canvas';

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
        var Log = LogSingleton.getInstance();
        var canvas: HTMLCanvasElement;
        var gl: WebGL2RenderingContext;

        //renderLoopThings
        var fps: number;
        var waitForNextFrameInMs: number;

        var lastUpdateTime: number = 0;
        var currentlyInLoop: boolean = false;

        var updateFunc: (time: number) => void;
        var renderFunc: (GL: WebGL2RenderingContext) => void;


        /**
         *  PRIVATE METHODS OF THE SINGLETON
         */
        function initDom() {
            const content: string = '<div id="container"><canvas id="canvas" /></div><div id="overlay"></div><div id="shader-space" />';
            const root: HTMLElement | null = document.getElementById('root');
            if (root === null) {
                Log.error('Canvas', 'Cant find root node!', true);
            } else {
                root.innerHTML = content;
            }
        }

        function setNewFps(newFps: number) {
            fps = newFps;
            waitForNextFrameInMs = 1000 / fps;
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
            lastUpdateTime = Date.now();
            canvas = document.querySelector('#canvas');
            gl = canvas.getContext('webgl2');
            window.addEventListener('resize', () => adjustSize());
            adjustSize();
            Log.info('Canvas', 'Initialised Successfully...')
        }

        function runLoop() {
            if (!currentlyInLoop) {
                // mark that we started a loop
                currentlyInLoop = true;
                const startTime = Date.now();

                // let the engine roll...!
                updateFunc(startTime);
                renderFunc(gl);

                // calculate how much time to wait for next draw call
                const finishTime = Date.now();
                const timeToWaitLeft: number = waitForNextFrameInMs - (finishTime - startTime);
                // finish Call
                lastUpdateTime = startTime;
                currentlyInLoop = false;
                if (timeToWaitLeft > 0) {
                    setTimeout(() => {
                        runLoop()
                    }, timeToWaitLeft);
                } else {
                    setTimeout(() => runLoop(), 1);
                }
            }
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

            startApplication(updateFunction: (time: number) => void, renderFunction: (GL: WebGL2RenderingContext) => void) {
                Log.info('Canvas', 'Starting Application...');
                renderFunc = renderFunction;
                updateFunc = updateFunction;
                runLoop();
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
