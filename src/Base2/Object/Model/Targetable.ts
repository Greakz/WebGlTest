import { Vec3 } from '../../Math/Vector/vec';

export interface Targetable {
    hitBox: any;
    checkHitBox(ray: any): Vec3 | null;
}

export function isTargetable(obj: any) {
    return (obj.hasOwnProperty('hibBox') && typeof obj.checkHitBox === 'function')
}