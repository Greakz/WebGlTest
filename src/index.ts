import { Canvas } from './3DScene/Base/Canvas';
import { initWorlds } from './3DScene/initWorlds';
import { Scene } from './3DScene/Base/Scene';
import { ShaderLoader } from './3DScene/Base/ShaderLoader';

ShaderLoader.loadShaders(() => {

    const canvas: HTMLCanvasElement | null = document.querySelector('#canvas');
    if(canvas !== null) {
        const GL: WebGLRenderingContext | null = canvas.getContext('webgl');
        if(GL !== null) {
            const scene: Scene = new Scene(initWorlds());
            const canvas: Canvas = new Canvas(scene, 60);
            scene.activateWorld(GL, 0);
            canvas.runLoop();
        }
    }
})
