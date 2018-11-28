import { Camera } from '../../../Base2/Camera/Camera';
import { MousePosition } from '../../../Base2/Singleton/MousePosition';
import MouseSingleton from '../../../Base2/Singleton/MouseSingleton';
import { radians } from '../../../Base2/Math/radians';

export class ExampleCamera extends Camera {

    private static MousePosition: MousePosition = MouseSingleton.getInstance();
    mouseXLastFrame: number = 0;
    mouseYLastFrame: number = 0;


    cameraDistance: number = 5;
    cameraPosition: number = 0;
    cameraAngle: number = 45;

    init() {
        ExampleCamera.MousePosition.addScrollEvent((delta: number) => {
            this.cameraDistance += (delta / 3);
        });
        this.updateCameraPosition();
    }

    update(time: number) {
        this.trackMouseMovement();
        this.updateLookAtMatrix();
    }

    updatedCameraDistance: number = 0;
    trackMouseMovement() {
        if (ExampleCamera.MousePosition.getRightStatus()) {
            let distanceX = 0;
            distanceX = ExampleCamera.MousePosition.get().x - this.mouseXLastFrame;
            const distanceY = ExampleCamera.MousePosition.get().y - this.mouseYLastFrame;
            this.cameraAngle += (distanceY / 5);
            this.cameraAngle = Math.min(85, this.cameraAngle);
            this.cameraAngle = Math.max(5, this.cameraAngle);
            this.cameraPosition += (-1 * (distanceX / 1000) * Math.PI * 2) % (2 * Math.PI);
            this.updateCameraPosition()
        } else if(this.updatedCameraDistance !== this.cameraDistance) {
            this.updateCameraPosition();
        }
        this.mouseXLastFrame = ExampleCamera.MousePosition.get().x;
        this.mouseYLastFrame = ExampleCamera.MousePosition.get().y;
    }

    updateCameraPosition() {
        const y = Math.sin(radians(this.cameraAngle)) * this.cameraDistance;
        const flatDistance = Math.cos(radians(this.cameraAngle)) * this.cameraDistance;

        this.position = {
            x: Math.sin(this.cameraPosition) * flatDistance,
            y: y,
            z: Math.cos(this.cameraPosition) * flatDistance
        };
        this.updatedCameraDistance = this.cameraDistance;
    }
}