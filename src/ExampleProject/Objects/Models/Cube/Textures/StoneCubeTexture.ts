import { TextureMap } from '../../../../../BaseLib/Object/Model/Texture/TextureMap';
import { Asset } from '../../../../../BaseLib/Object/Model/Asset/Asset';
import { ArrayBufferData } from '../../../../../BaseLib/Object/Model/DataArrays/ArrayBufferData';
import { WoodAsset } from '../../../Assets/WoodAsset';
import { StoneAsset } from '../../../Assets/StoneAsset';

export class StoneCubeTexture extends TextureMap {
    slot: number = 0;
    uf_target_name: string = 'uSampler';
    asset: Asset = StoneCubeTexture.AssetProvider.getAsset(new StoneAsset());
    attribute_pointer_name: string = 'aTextureCoord';
    coordinates: ArrayBufferData = new ArrayBufferData([
        // vorne
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // hinten
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // oben
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // unten
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // rechts
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // links
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ], 2);
}