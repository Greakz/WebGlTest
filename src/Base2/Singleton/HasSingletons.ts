import { VAOProvider } from './VAOProvider';
import { ShaderProvider } from './ShaderProvider';
import VAOProviderSingleton from './VAOProviderSingleton';
import ShaderProviderSingleton from './ShaderProviderSingleton';
import {Log} from './Log';
import LogSingleton from './LogSingleton';
import { Canvas } from './Canvas';
import CanvasSingleton from './CanvasSingleton';
import { TextureProvider } from './TextureProvider';
import TextureProviderSingleton from './TextureProviderSingleton';

export abstract class HasSingletons {
    protected static VAOProvider: VAOProvider = VAOProviderSingleton.getInstance();
    protected static ShaderProvider: ShaderProvider = ShaderProviderSingleton.getInstance();
    protected static TextureProvider: TextureProvider = TextureProviderSingleton.getInstance();
    protected static Log: Log = LogSingleton.getInstance();
}

export abstract class HasLog {
    protected static Log: Log = LogSingleton.getInstance();
}
export abstract class HasCanvas {
    protected static Canvas: Canvas = CanvasSingleton.getInstance();
}