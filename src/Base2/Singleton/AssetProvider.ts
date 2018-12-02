import { Asset } from '../Object/Model2/Texture/TextureSource';

export interface AssetProvider {
    getAsset<T extends Asset>(asset: T): T;
}