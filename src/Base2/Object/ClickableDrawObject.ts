import { Mat4 } from '../Math/Matrix/mat';
import { SceneObject } from '../Scene/SceneObject';
import { Transformation } from './Model/Transformation';
import { ClickAble } from './Implements/Clickable';
import { HitBox } from './Model/HitBox/HitBox';
import { Vec3 } from '../Math/Vector/vec';
import { Canvas } from '../Singleton/Canvas';
import CanvasSingleton from '../Singleton/CanvasSingleton';

export class ClickAbleDrawObject extends SceneObject implements ClickAble {
    private initDone: boolean = false;
    transformation: Transformation = new Transformation();

    initSelfAndChildren() {
        this.init();
        this.initClickablesListener();
        this.initDone = true;
    }

    updateSelfAndChildren(time: number) {
        if (this.initDone) {


            this.update(time);
        }
    }

    renderSelfAndChildren(GL: WebGL2RenderingContext, projMat: Mat4) {
        if (this.initDone) {

            this.render(GL, projMat);
        }
    }

    init() {
    }

    update(time: number) {
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4) {
    }

    // ClickAble Interface
    isHovered: boolean;
    hoverPoint: Vec3 | null;
    hitBox: HitBox;

    protected initClickables() {


    }

    onLeftClick() {
    }

    onLeftDown() {
    }

    onLeftUp() {
    }

    onRightClick() {
    }

    onRightDown() {
    }

    onRightUp() {
    }

    private Canvas: Canvas = CanvasSingleton.getInstance();

    protected initClickablesListener() {
        this.addClickablesListener();
    }

    private addClickablesListener() {
        const container: HTMLElement | null = document.getElementById(this.Canvas.getClickListenerPlane());
        if (container !== null) {
            container.addEventListener('mousedown', (e: any) => {
                let isRightMB;
                if ('which' in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                    isRightMB = e.which == 3;
                else if ('button' in e)  // IE, Opera
                    isRightMB = e.button == 2;

                if (isRightMB) {
                    this.mouseDown(false);
                } else {
                    this.mouseDown(true);
                }
            });
            container.addEventListener('mouseup', (e: any) => {
                let isRightMB;
                if ('which' in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                    isRightMB = e.which == 3;
                else if ('button' in e)  // IE, Opera
                    isRightMB = e.button == 2;

                if (isRightMB) {
                    this.mouseUp(false);
                } else {
                    this.mouseUp(true);
                }
            });
            container.addEventListener('mouseleave', (e: any) => {
                this.mouseUp(false);
                this.mouseUp(true);
            });
        }
    }

    protected leftClickWasWhileHover: boolean = false;
    protected rightClickWasWhileHover: boolean = false;

    protected mouseDown(left: boolean) {
        if (this.isHovered) {
            if (left) {
                this.onLeftDown();
                this.leftClickWasWhileHover = true;
            } else {
                this.onRightDown();
                this.rightClickWasWhileHover = true;
            }
        } else {
            if (left) {
                this.leftClickWasWhileHover = false;
            } else {
                this.rightClickWasWhileHover = false;
            }
        }
    }

    protected mouseUp(left: boolean) {
        if (this.isHovered) {
            if (left) {
                this.onLeftUp();
                if (this.leftClickWasWhileHover) {
                    this.onLeftClick()
                }
            } else {
                this.onRightUp();
                if (this.rightClickWasWhileHover) {
                    this.onRightClick()
                }
            }
        } else {
            if (left) {
                this.leftClickWasWhileHover = false;
            } else {
                this.rightClickWasWhileHover = false;
            }
        }
    }

}