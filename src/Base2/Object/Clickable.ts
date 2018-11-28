import { Hitable, isHitable } from './Model/Hitable';

export interface Clickable extends Hitable{
    onLeftClick();
    onLeftDown();
    onLeftUp()
    onRightClick();
    onRightDown();
    onRightUp();
}

export function isClickable(obj: any) {
    return isHitable(obj) && (
        typeof obj.onLeftClick === 'function'
        && typeof obj.onLeftDown === 'function'
        && typeof obj.onLeftUp === 'function'
        && typeof obj.onRightClick === 'function'
        && typeof obj.onRightDown === 'function'
        && typeof obj.onRightUp === 'function'
    )
}