import { Mouse } from './Mouse';
import { mouseInstance } from '../../index';
import { Vec3 } from './MathTypes/Types/vectors';
import { Mat4 } from './MathTypes/Types/matrix';
import {
    getOrthographicMatrix, getPerspectiveMatrix, lookAtMatrix, multiplyMatrices,
    radians
} from './MathTypes/matrix.util';
import {
    addVec3s, crossProductVec3, normalizeVec3, scaleVec3, subtractVec3s,
} from './MathTypes/vector.util';
import { Ray } from './Ray';

export class Camera {
    protected position: Vec3;
    protected target: Vec3;
    protected up: Vec3 = {x: 0, y: 1, z: 0};

    protected screenHeight: number;
    protected screenWidth: number;

    protected perspective_matrix: Mat4;
    protected look_at_matrix: Mat4;

    protected fovY: number;
    protected aspect: number;
    protected zNear = 0.1;
    protected zFar = 100;

    protected mouse: Mouse;
    private mouseXLastFrame: number;
    private mouseYLastFrame: number;
    protected statePosition: number;
    protected heightPosition: number;

    constructor(position: Vec3, target: Vec3) {
        this.position = position;
        this.target = target;
        this.fovY = 60;
        this.mouse = mouseInstance;
        this.statePosition = 0;
        this.heightPosition = 0;
        window.addEventListener('resize', (e) => this.calculateWindowSize());
        this.calculateWindowSize();
        this.updateLookAtMatrix();
        this.updatePerspectiveMatrix();
    }

    calculateWindowSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        this.aspect = this.screenWidth / this.screenHeight
    }

    getViewMatrix(): Mat4 {
        return multiplyMatrices(
            this.perspective_matrix,
            this.look_at_matrix
        );
    }

    updateUpVector() {
        const lookVec = subtractVec3s(this.position, this.target);

        const horiz = crossProductVec3(
            lookVec,
            {x: 0, y: 1, z: 0}
        );
        this.up = crossProductVec3(
            horiz,
            lookVec
        );
    }

    updateLookAtMatrix() {
        // this.updateUpVector();
        this.look_at_matrix = lookAtMatrix(
            this.position,
            this.target,
            this.up
        )
    }

    updatePerspectiveMatrix(): void {
        this.perspective_matrix = getPerspectiveMatrix(
            radians(this.fovY),
            this.aspect,
            this.zNear,
            this.zFar
        );
    }


    getRay(screenX: number, screenY: number): Ray {
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

        let positionToNearPlaneCenter: Vec3 = scaleVec3(view, (this.zNear * 1.1));

        // mouse and vectors
        let yPosOnNearPlane: Vec3 = scaleVec3(vert, mouse_y);
        let xPosOnNearPlane: Vec3 = scaleVec3(horiz, mouse_x);
        let nearPlaneCenter: Vec3 =  addVec3s(
            this.position,
            positionToNearPlaneCenter
        );
        let pos: Vec3 = addVec3s(addVec3s(nearPlaneCenter, xPosOnNearPlane), yPosOnNearPlane);
        let direction: Vec3 = subtractVec3s(pos, this.position);

        return {
            pos: pos,
            dir: direction
        }
    }


    setPosition(position: Vec3): void {
        this.position = position;
    }

    setFOV(fov: number): void {
        this.fovY = fov;
    }

    setTarget(target: Vec3): void {
        this.target = target;
    }

    update() {
        if (this.mouse.leftClicked) {
            const distance = 20;
            const distanceX = this.mouse.x - this.mouseXLastFrame;
            this.statePosition += (-1 * (distanceX / 1000) * Math.PI * 2) % (2 * Math.PI);
            const distanceY = this.mouse.y - this.mouseYLastFrame;
            this.heightPosition += (-1 * (distanceY / 1000) * Math.PI * 2) % (Math.PI);

            this.position = {
                x: Math.sin(this.statePosition) * (1 - Math.pow(Math.sin(this.heightPosition), 2)) * distance,
                y: Math.sin(this.heightPosition) * distance,
                z: Math.cos(this.statePosition) * (1 - Math.pow(Math.sin(this.heightPosition), 2)) * distance
            };
        }
        this.mouseXLastFrame = this.mouse.x;
        this.mouseYLastFrame = this.mouse.y;

        this.updateLookAtMatrix();
        this.updatePerspectiveMatrix();
    }
}