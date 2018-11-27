import { Vec2 } from '../Math/Vector/vec';

export interface MousePosition {
    get(): Vec2;
    getLeftStatus(): boolean;
    getRightStatus(): boolean;
    init(): void;
}