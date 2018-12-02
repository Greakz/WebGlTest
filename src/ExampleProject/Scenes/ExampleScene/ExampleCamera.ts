import { Camera } from '../../../BaseLib/Camera/Camera';
import { MousePosition } from '../../../BaseLib/Singleton/MousePosition';
import MouseSingleton from '../../../BaseLib/Singleton/MouseSingleton';
import { radians } from '../../../BaseLib/Math/radians';

export class ExampleCamera extends Camera {

    private static MousePosition: MousePosition = MouseSingleton.getInstance();
    mouseXLastFrame: number = 0;
    mouseYLastFrame: number = 0;


    cameraDistance: number = 5;
    cameraPosition: number = 0;
    cameraAngle: number = 45;

    init() {
        ExampleCamera.MousePosition.addScrollEvent((delta: number) => {
            this.cameraDistance += (delta > 0) ? 1 : -1;
        });
        this.updateCameraPosition();
    }

    update(time: number) {
        this.trackMouseMovement();
    }

    updatedCameraDistance: number = 0;
    trackMouseMovement() {
        if (ExampleCamera.MousePosition.getRightStatus()) {
            // Move X
            let distanceX = ExampleCamera.MousePosition.get().x - this.mouseXLastFrame;
            this.cameraPosition += (-1 * (distanceX / 1000) * Math.PI * 2) % (2 * Math.PI);
            // Move Y
            const distanceY = ExampleCamera.MousePosition.get().y - this.mouseYLastFrame;
            this.cameraAngle += (distanceY / 5);
            this.cameraAngle = Math.min(85, this.cameraAngle);
            this.cameraAngle = Math.max(5, this.cameraAngle);
            this.updateCameraPosition()
        } else if(this.updatedCameraDistance !== this.cameraDistance) {
            // If Scroll Wheel did S.Th.
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
        this.updateLookAtMatrix();
    }
}