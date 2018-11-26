/*
    -SINGLETON-
     Do not create an instance by your own.
    Just import the given instance from this file
    to make sure your use the singleton as a singleton!

    class:
    ShaderProvider

    can be asked to get new Shader References


 */

import { Shader } from '../Shader/Shader';

export interface ShaderProvider {

}

class ShaderProviderClass implements ShaderProvider{

    private shader_list: Shader[];

    constructor() {}



}

const instance: ShaderProvider = new ShaderProviderClass();
Object.freeze(instance);

export default instance;