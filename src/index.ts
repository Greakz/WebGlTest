import { Canvas } from './3DScene/Base/Canvas';
import { initWorlds } from './3DScene/initWorlds';
import { Scene } from './3DScene/Base/Scene';
import { ShaderLoader } from './3DScene/Base/ShaderLoader';
import { Mouse } from './3DScene/Base/Mouse';

export const mouseInstance: Mouse = {
    x: 0,
    y: 0,
    leftClicked: false,
    rightClicked: false,
};

document.addEventListener('DOMContentLoaded', (event) => {
    ShaderLoader.loadShaders(() => {
        const canvas: HTMLCanvasElement | null = document.querySelector('#canvas');
        if (canvas !== null) {
            const GL: WebGLRenderingContext | null = canvas.getContext('webgl');
            if (GL !== null) {
                const scene: Scene = new Scene(initWorlds());
                const canvas: Canvas = new Canvas(scene, 60);
                scene.activateWorld(GL, 0);
                canvas.runLoop();
            }
        }
    })

    const overlay: HTMLElement | null = document.getElementById('overlay');
    if (overlay !== null) {
        overlay.addEventListener('mousemove', (e) => {
            mouseInstance.x = e.clientX;
            mouseInstance.y = e.clientY;
        });
        overlay.addEventListener('mousedown', (e: any) => {
            let isRightMB;
            if ('which' in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                isRightMB = e.which == 3;
            else if ('button' in e)  // IE, Opera
                isRightMB = e.button == 2;

            if (isRightMB) {
                mouseInstance.rightClicked = true;
            } else {
                mouseInstance.leftClicked = true
            }
        });
        overlay.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        overlay.addEventListener('mouseleave', (e) => {
            if (e.clientX !== 0 || e.clientY !== 0) {
                mouseInstance.leftClicked = false;
            }
        });
        overlay.addEventListener('mouseup', (e: any) => {
            let isRightMB;
            if ('which' in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                isRightMB = e.which == 3;
            else if ('button' in e)  // IE, Opera
                isRightMB = e.button == 2;

            if (isRightMB) {
                mouseInstance.rightClicked = false;
            } else {
                mouseInstance.leftClicked = false;
            }
        });
    }
});
