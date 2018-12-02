import { TextureMap } from '../../../../../Base2/Object/Model2/Texture/TextureMap';
import { Asset } from '../../../../../Base2/Object/Model2/Texture/TextureSource';
import { ArrayBufferData } from '../../../../../Base2/Object/Model2/DataArrays/ArrayBufferData';
import { WoodAsset } from '../../../Assets/WoodAsset';

export class WoodCubeTexture extends TextureMap {
    slot: number = 0;
    uf_target_name: string = 'uSampler';
    asset: Asset = WoodCubeTexture.AssetProvider.getAsset(new WoodAsset());
    attribute_pointer_name: string = 'aTextureCoord';
    coordinates: ArrayBufferData = new ArrayBufferData([
        // vorne
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // hinten
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // oben
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // unten
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // rechts
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // links
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ], 2);
}