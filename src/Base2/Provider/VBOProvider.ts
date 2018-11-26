/*
    -SINGLETON-
     Do not create an instance by your own.
    Just import the given instance from this file
    to make sure your use the singleton as a singleton!

    class:
    ObjectProvider

    can be asked to get new VBO's


 */

export interface VBOProvider {

}


class VBOProviderClass implements VBOProvider{


}

const instance = new VBOProviderClass();
Object.freeze(instance);

export default instance;