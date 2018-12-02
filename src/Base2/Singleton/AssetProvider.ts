import { Asset } from '../Object/Model2/Asset/Asset';

export interface AssetProvider {
    getAsset<T extends Asset>(asset: T): T;
}