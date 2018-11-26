import { VBOProvider } from './VBOProvider';
import { ShaderProvider } from './ShaderProvider';
import VBOProviderSingleton from './VBOProviderSingleton';
import ShaderProviderSingleton from './ShaderProviderSingleton';
import {Log} from './Log';
import LogSingleton from './LogSingleton';

export abstract class HasSingletons {
    protected static VBOProvider: VBOProvider = VBOProviderSingleton.getInstance();
    protected static ShaderProvider: ShaderProvider = ShaderProviderSingleton.getInstance();
    protected static Log: Log = LogSingleton.getInstance();
}