import { Vec2 } from '../Math/Vector/vec';

export interface MousePosition {
    get(): Vec2;
    init(): void;
}