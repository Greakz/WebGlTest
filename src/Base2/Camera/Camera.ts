import { Mat4 } from '../Math/Matrix/mat';
import { Vec3 } from '../Math/Vector/vec';
import { multiplyMatrices } from '../Math/Matrix/multiply';
import { lookAtMatrix } from '../Math/Matrix/lookAt';
import { getPerspectiveMatrix } from '../Math/Matrix/perspective';
import { radians } from '../Math/radians';
import { identity } from '../Math/Matrix/identity';
import { crossProductVec3, normalizeVec3, subtractVec3s } from '../../3DScene/Base/MathTypes/vector.util';
import { scaleVec3 } from '../Math/Vector/scale';
import { addVec3 } from '../Math/Vector/add';
import { Ray } from '../Math/Ray/Ray';
import { HasLog } from '../Singleton/HasSingletons';

class CameraCore extends HasLog {
    protected perspective_matrix: Mat4;
    protected look_at_matrix: Mat4;

    protected position: Vec3;
    protected target: Vec3;
    protected up: Vec3 = {x: 0, y: 1, z: 0};

    protected fovY: number;
    protected aspect: number;
    protected zNear: number = 0.1;
    protected zFar: number = 100;

    constructor(position: Vec3, target: Vec3, fovY: number = 60) {
        super();
        this.position = position;
        this.target = target;
        this.fovY = fovY;
    }

    screenRay(screenX: number, screenY: number): Ray {
        return this.calculateScreenPositionRay(screenX, screenY);
    }

    init() {
        window.addEventListener('resize', () => {
            this.calculateWindowSize();
        });
        this.calculateWindowSize();
        Camera.Log.info('Camera', 'Initialised!')
    }

    update(time: number) {
        this.updateLookAtMatrix();
    }

    getProjectionMatrix(): Mat4 {
        if(this.lookAtInit && this.perspInit) {
            return multiplyMatrices(
                this.perspective_matrix,
                this.look_at_matrix
            );
        } else {
            Camera.Log.warning('Camera', 'Got asked for Projection Matrix. Camera not initialised!');
            return identity()
        }

    }

    getPosition(): Vec3 {
        return this.position;
    }
    getTarget(): Vec3 {
        return this.target;
    }

    protected updatePerspectiveMatrix() {
        this.perspective_matrix = getPerspectiveMatrix(
            radians(this.fovY),
            this.aspect,
            this.zNear,
            this.zFar
        );
        this.perspInit = true;
    }

    protected updateLookAtMatrix() {
        this.look_at_matrix = lookAtMatrix(
            this.position,
            this.target,
            this.up
        );
        this.lookAtInit = true;
    }

    private screenHeight: number;
    private screenWidth: number;
    private lookAtInit: boolean = false;
    private perspInit: boolean = false;

    private calculateWindowSize() {
        const newHeight = document.getElementById('container').clientHeight;
        const newWidth = document.getElementById('container').clientWidth;
        if(newWidth === undefined || newHeight === undefined) {
            Camera.Log.error('Camera', 'Height or Width of Container is undefined!')
        }
        this.screenHeight = newHeight;
        this.screenWidth = newWidth;
        this.aspect = this.screenWidth / this.screenHeight;
        this.updatePerspectiveMatrix();
    }

    private calculateScreenPositionRay(screenX: number, screenY: number): Ray {
            screenY = (this.screenHeight - screenY);

            let mouse_x: number = screenX - (this.screenWidth / 2);
            let mouse_y: number = screenY - (this.screenHeight / 2);
            mouse_y /= (this.screenHeight / 2);
            mouse_x /= (this.screenWidth / 2);

            // vectors
            let view: Vec3 = subtractVec3s(this.target, this.position);
            view = normalizeVec3(view);

            let horiz: Vec3 = crossProductVec3(view, this.up);
            horiz = normalizeVec3(horiz);

            let vert: Vec3 = crossProductVec3(horiz, view);
            vert = normalizeVec3(vert);

            let rad = this.fovY * Math.PI / 180;
            let vLength = Math.tan(rad / 2) * this.zNear;
            let hLength = vLength * this.aspect;

            vert = scaleVec3(vert, vLength);
            horiz = scaleVec3(horiz, hLength);

            let positionToNearPlaneCenter: Vec3 = scaleVec3(view, this.zNear);

            // mouse and vectors
            let yPosOnNearPlane: Vec3 = scaleVec3(vert, mouse_y);
            let xPosOnNearPlane: Vec3 = scaleVec3(horiz, mouse_x);
            let nearPlaneCenter: Vec3 =  addVec3(
                this.position,
                positionToNearPlaneCenter
            );
            let pos: Vec3 = addVec3(addVec3(nearPlaneCenter, xPosOnNearPlane), yPosOnNearPlane);
            let direction: Vec3 = subtractVec3s(pos, this.position);

            return {
                position: pos,
                direction: direction
            }

    }
}

export class Camera extends CameraCore {

    update(time: number) {

        // call this to actually update the camera!
        this.updateLookAtMatrix();
    }

}