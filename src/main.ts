import { Canvas } from './Base2/Singleton/Canvas'
import CanvasSingleton from './Base2/Singleton/CanvasSingleton'
import { State } from './Base2/State/StateManager';
import { ExampleStateManager } from './Base2Example/ExampleStateManager';
import { ExampleScene } from './Base2Example/Scenes/ExampleScene';
/*
    MAIN.TS
    This file is the Entry point of our Application.
    We should set up some Stages here and create a StateManager with them.
    To Start the Application we simply call runStateManager() on the CanvasInstance
 */

// wait for dom to get loaded!
document.addEventListener('DOMContentLoaded', () => {

    const Canvas: Canvas = CanvasSingleton.getInstance();
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
    Canvas.startApplication(
        (time: number) => stateManager.updateSelfAndChildren(time),
        (GL: WebGLRenderingContext) => stateManager.renderSelfAndChildren(GL)
    );
    stateManager.initActiveState();
});
