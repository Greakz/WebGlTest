import { Asset } from '../Object/Model/Asset/Asset';

export interface AssetProvider {
    getAsset<T extends Asset>(asset: T): T;
}