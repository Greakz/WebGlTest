import { HitBox } from '../Model2/HitBox/HitBox';
import { Transformation } from '../Transformation';

export interface HitAble {
    transformation: Transformation;
    hitBox: HitBox;
}

export function isHitAble(obj: any) {
    return (obj.hitBox !== undefined && typeof obj.hitBox.checkHit === 'function')
}