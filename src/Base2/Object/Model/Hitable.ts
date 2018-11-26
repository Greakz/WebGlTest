import { isTargetable, Targetable } from './Targetable';
import { Vec3 } from '../../Math/Vector/vec';

export interface Hitable extends Targetable{
    isHovered: boolean;
    isActive: boolean;
    onHover(intersectionPoint: Vec3);
    onLeftDown(intersectionPoint: Vec3);
    onLeftUp(intersectionPoint: Vec3);
    onLeftClick(intersectionPoint: Vec3);
    onRightDown(intersectionPoint: Vec3);
    onRightUp(intersectionPoint: Vec3);
    onRightClick(intersectionPoint: Vec3);
}

export function isHitable(obj: any) {
    return isTargetable(obj) && (
        obj.hasOwnProperty('isHovered')
        &&obj.hasOwnProperty('isActive')
        && typeof obj.onHover === 'function'
        && typeof obj.onLeftDown === 'function'
        && typeof obj.onLeftUp === 'function'
        && typeof obj.onLeftClick === 'function'
        && typeof obj.onRightDown === 'function'
        && typeof obj.onRightUp === 'function'
        && typeof obj.onRightClick === 'function'
    )
}