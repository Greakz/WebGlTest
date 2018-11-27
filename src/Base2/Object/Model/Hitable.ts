import { isTargetable, Targetable } from './Targetable';
import { Vec3 } from '../../Math/Vector/vec';

export interface Hitable extends Targetable{
    isHovered: boolean;
    hoverPoint: Vec3 | null
}

export function isHitable(obj: any) {
    return isTargetable(obj) && (
        obj.hasOwnProperty('isHovered')
        &&obj.hasOwnProperty('isActive')
    )
}