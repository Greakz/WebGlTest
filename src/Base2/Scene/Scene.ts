import { HasSingletons } from '../Singleton/HasSingletons';
import { SceneObject } from './SceneObject';
import { SceneEvent } from './SceneEvent';
import { Camera } from '../Camera/Camera';
import { Mat4 } from '../Math/Matrix/mat';
import { MousePosition } from '../Singleton/MousePosition';
import MouseSingleton from '../Singleton/MouseSingleton';
import { Hitable, isHitable } from '../Object/Model/Hitable';
import { Vec2, Vec3 } from '../Math/Vector/vec';
import { Ray } from '../Math/Ray/Ray';
import { isTargetable } from '../Object/Model/Targetable';

class SceneCore extends HasSingletons {
    protected static MousePosition: MousePosition = MouseSingleton.getInstance();
    protected camera: Camera;
    protected sceneObjects: SceneObject[] = [];
    protected hitObjects: Hitable[] = [];
    protected sceneEvents: SceneEvent[] = [];

    initSelfAndChildren() {
        this.sceneObjects.forEach(sO => sO.initSelfAndChildren());
        this.init();
        this.camera.init();
    }

    updateSelfAndChildren(time: number) {
        this.camera.update(time);
        this.checkMouseHover();
        this.sceneObjects.forEach(sO => sO.updateSelfAndChildren(time));
        this.update(time);
    }

    renderSelfAndChildren(GL: WebGL2RenderingContext) {
        const projMat: Mat4 = this.camera.getProjectionMatrix();
        this.sceneObjects.forEach(sO => sO.renderSelfAndChildren(GL, projMat));
        this.render(GL, projMat);
    }

    init() {
    }

    update(time: number) {
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4) {
    }

    private idCreationIndex: number = 0;

    protected addSceneObject(obj: SceneObject) {
        obj.setId(this.idCreationIndex);
        this.idCreationIndex++;
        this.sceneObjects.push(obj);
        if (isTargetable(obj)) {
            this.addToHitObjects(obj);
        }
    }

    private addToHitObjects(obj: SceneObject) {
        this.hitObjects.push((obj as any));
    }

    private hoveredObjectIndex: number = -1;
    private hoverPointIn3DSpace: Vec3 | null = null;

    private checkMouseHover() {
        const mousePosition: Vec2 = SceneCore.MousePosition.get();
        const mouseRay: Ray = this.camera.screenRay(mousePosition.x, mousePosition.y);
        let hoveredBefore = this.hoveredObjectIndex;
        this.hoveredObjectIndex = -1;
        this.hoverPointIn3DSpace = this.hitObjects.reduce(
            (acc: Vec3 | null, hitObject: Hitable, index: number) => {
                let checkHit: Vec3 | null = hitObject.hitBox.checkHit(mouseRay, hitObject.transformation.getMatrix(), this.camera.getPosition());
                if (checkHit !== null) {
                    this.hoveredObjectIndex = index;
                    return checkHit;
                }
                return acc;
            },
            null
        );
        if (hoveredBefore !== -1) {
            this.hitObjects[hoveredBefore].isHovered = false;
            this.hitObjects[hoveredBefore].hoverPoint = null;
        }
        if (this.hoveredObjectIndex !== -1) {
            this.hitObjects[this.hoveredObjectIndex].isHovered = true;
            this.hitObjects[this.hoveredObjectIndex].hoverPoint = this.hoverPointIn3DSpace;
        }
    }
}

export class Scene extends SceneCore {
    /**
     constructor() of Scene;
     create some SceneObjects here with the method this.addSceneObject(obj: SceneObject)!
     */
    constructor() {
        super();
    }

    /**
     init() of Scene;
     Initialize the Scene itself only here!
     All SceneObjects that you created in the Constructor
     will get initialized through the initSelfAndChild() method
     of The SceneCore!
     */
    init() {
    }

    update(time: number) {
    }

    render(GL: WebGL2RenderingContext, projMat: Mat4) {
    }
}