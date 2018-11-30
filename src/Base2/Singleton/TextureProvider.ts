import { Texture } from '../Object/Model/Texture/Texture';

export interface TextureProvider {
    getTexture<T extends Texture>(texture: T): T;
}