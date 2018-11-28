import { Scene } from '../Scene/Scene';
import { HasSingletons } from '../Singleton/HasSingletons';

export interface State {
    state: string;
    scene: Scene;
}

abstract class StateManagerCore extends HasSingletons {
    protected states: State[];
    protected activeState: State;

    constructor(states: State[], activeScene?: number) {
        super();
        if (states.length === 0) {
            StateManagerCore.Log.error('StateManager', 'No Scene available', true);
        }
        this.states = states;
        if (activeScene) {
            this.activeState = this.states[activeScene];
        } else {
            this.activeState = this.states[0];
        }
        StateManagerCore.Log.info('StateManager', 'Successfully created.');
    }

    initActiveState(): void {
        this.activeState.scene.initSelfAndChildren();
    }

    changeState(newState: string | number | State) {
        if(typeof newState === 'number') {
            this.activeState = this.states[newState];
            this.initActiveState();
        } else if (typeof newState === 'string') {
            this.activeState = this.states.reduce(
                (acc: State, checkState: State) => {
                    if(checkState.state === newState) {
                        return checkState;
                    }
                    return acc;
                },
                this.activeState
            );
            this.initActiveState();
        } else {
            this.activeState = newState;
            this.initActiveState();
        }
    }

    updateSelfAndChildren(time: number): void {
        this.update(time);
        this.activeState.scene.updateSelfAndChildren(time);
    }
    update(time: number): void {}

    renderSelfAndChildren(GL: WebGL2RenderingContext): void {
        this.activeState.scene.renderSelfAndChildren(GL);
        this.render(GL);
    }
    render(GL: WebGL2RenderingContext) {}
}

export abstract class StateManager extends StateManagerCore {

    protected states: State[];
    protected activeState: State;

    constructor(states: State[]) {
        super(states);
    }

    init(GL: WebGL2RenderingContext): void {}

    update(time: number): void  {}

    render(GL: WebGL2RenderingContext): void  {}
}
