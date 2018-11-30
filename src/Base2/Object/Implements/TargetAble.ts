import { Vec3 } from '../../Math/Vector/vec';
import { HitAble, isHitAble } from './HitAble';

export interface TargetAble extends HitAble {
    isHovered: boolean;
    hoverPoint: Vec3 | null
}

export function isTargetAble(obj: any) {
    return isHitAble(obj) && (
        obj.hasOwnProperty('isHovered')
        &&obj.hasOwnProperty('isActive')
    )
}