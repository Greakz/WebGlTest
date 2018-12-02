import { TextureMap } from '../../../../../BaseLib/Object/Model/Texture/TextureMap';
import { Asset } from '../../../../../BaseLib/Object/Model/Asset/Asset';
import { ArrayBufferData } from '../../../../../BaseLib/Object/Model/DataArrays/ArrayBufferData';
import { WoodAsset } from '../../../Assets/WoodAsset';

export class WoodCubeTexture extends TextureMap {
    slot: number = 0;
    uf_target_name: string = 'uSampler';
    asset: Asset = WoodCubeTexture.AssetProvider.getAsset(new WoodAsset());
    attribute_pointer_name: string = 'aTextureCoord';
    coordinates: ArrayBufferData = new ArrayBufferData([
        // vorne
        0.0, 0.0,
        0.5, 0.0,
        0.5, 0.5,
        0.0, 0.5,
        // hinten
        0.0, 0.0,
        0.0, 0.5,
        0.5, 0.5,
        0.5, 0.0,
        // oben
        0.5, 0.0,
        1.0, 0.0,
        1.0, 0.5,
        0.5, 0.5,
        // unten
        0.5, 0.0,
        1.0, 0.0,
        1.0, 0.5,
        0.5, 0.5,
        // rechts
        0.0, 0.0,
        0.0, 0.5,
        0.5, 0.5,
        0.5, 0.0,
        // links
        0.0, 0.0,
        0.5, 0.0,
        0.5, 0.5,
        0.0, 0.5
    ], 2);
}