import { DrawObject } from '../../../Base2/Object/DrawObject';
import { Triangle } from '../../Models/Triangle';
import { Mat4 } from '../../../Base2/Math/Matrix/mat';
import { Vec3 } from '../../../Base2/Math/Vector/vec';
import { Hitable } from '../../../Base2/Object/Model/Hitable';

export class FirstObject extends DrawObject implements Hitable {

    private model: Triangle;

    init() {
        this.model = new Triangle();
        this.model.init();
    }

    update(time) {
    }
    render(GL: WebGL2RenderingContext, projMat: Mat4) {
        this.model.render(GL, projMat);
    }

    // targetable
    hitBox: any = {};
    checkHitBox(ray: any): Vec3 | null {
        return null;
    }
    // Hitable
    isHovered: boolean = false;
    isActive: boolean = false;
    onHover(intersectionPoint: Vec3) {}
    onLeftDown(intersectionPoint: Vec3) {}
    onLeftUp(intersectionPoint: Vec3) {}
    onLeftClick(intersectionPoint: Vec3) {}
    onRightDown(intersectionPoint: Vec3) {}
    onRightUp(intersectionPoint: Vec3) {}
    onRightClick(intersectionPoint: Vec3) {}
}