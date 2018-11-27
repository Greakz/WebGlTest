import { HitBox } from './HitBox/HitBox';
import { Transformation } from './Transformation';

export interface Targetable {
    transformation: Transformation;
    hitBox: HitBox;
}

export function isTargetable(obj: any) {
    return (obj.hitBox !== undefined && typeof obj.hitBox.checkHit === 'function')
}