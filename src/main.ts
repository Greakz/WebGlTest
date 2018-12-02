import { Canvas } from './BaseLib/Singleton/Canvas'
import { Log } from './BaseLib/Singleton/Log'
import CanvasSingleton from './BaseLib/Singleton/CanvasSingleton'
import LogSingleton from './BaseLib/Singleton/LogSingleton'
import { State } from './BaseLib/State/StateManager';
import { ExampleStateManager } from './ExampleProject/ExampleStateManager';
import { ExampleScene } from './ExampleProject/Scenes/ExampleScene/ExampleScene';
/*
    MAIN.TS
    This file is the Entry point of our Application.
    We should set up some Stages here and create a StateManager with them.
    To Start the Application we simply call runStateManager() on the CanvasInstance
 */

// wait for dom to get loaded!
document.addEventListener('DOMContentLoaded', () => {

    const Canvas: Canvas = CanvasSingleton.getInstance();
    const log: Log = LogSingleton.getInstance();
    log.show_logs();
    // First create some States between the State Manager can switch!
    const states: State[] = [
        {
            state: 'main',
            scene: new ExampleScene()
        }
    ];
    // create our own StateManager
    const stateManager: ExampleStateManager = new ExampleStateManager(states);
    // Start the actual Application
    Canvas.init();
    Canvas.setFps(60);
    Canvas.startApplication(
        (time: number) => stateManager.updateSelfAndChildren(time),
        (GL: WebGL2RenderingContext) => stateManager.renderSelfAndChildren(GL)
    );
    stateManager.initActiveState();
});
