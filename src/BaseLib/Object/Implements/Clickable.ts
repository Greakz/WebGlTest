import { isTargetAble, TargetAble } from './TargetAble';

export interface ClickAble extends TargetAble{
    onLeftClick();
    onLeftDown();
    onLeftUp()
    onRightClick();
    onRightDown();
    onRightUp();
}

export function isClickAble(obj: any) {
    return isTargetAble(obj) && (
        typeof obj.onLeftClick === 'function'
        && typeof obj.onLeftDown === 'function'
        && typeof obj.onLeftUp === 'function'
        && typeof obj.onRightClick === 'function'
        && typeof obj.onRightDown === 'function'
        && typeof obj.onRightUp === 'function'
    )
}