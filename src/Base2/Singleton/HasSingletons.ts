import { ShaderProvider } from './ShaderProvider';
import ShaderProviderSingleton from './ShaderProviderSingleton';
import {Log} from './Log';
import LogSingleton from './LogSingleton';
import { Canvas } from './Canvas';
import CanvasSingleton from './CanvasSingleton';
import { AssetProvider } from './AssetProvider';
import AssetProviderSingleton from './AssetProviderSingleton';
import { MeshProvider } from './MeshProvider';
import MeshProviderSingleton from './MeshProviderSingleton';

export abstract class HasSingletons {
    protected static ShaderProvider: ShaderProvider = ShaderProviderSingleton.getInstance();
    protected static AssetProvider: AssetProvider = AssetProviderSingleton.getInstance();
    protected static MeshProvider: MeshProvider = MeshProviderSingleton.getInstance();
    protected static Log: Log = LogSingleton.getInstance();
}

export abstract class HasLog {
    protected static Log: Log = LogSingleton.getInstance();
}
export abstract class HasCanvas {
    protected static Canvas: Canvas = CanvasSingleton.getInstance();
}