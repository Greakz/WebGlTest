import { Vao } from './VAO/Vao';
import { HasSingletons } from '../../Singleton/HasSingletons';
import { Shader } from '../../Shader/Shader';
import { Mat4 } from '../../Math/Matrix/mat';

export class Model extends HasSingletons{

    protected vao: Vao;
    protected shader: Shader;
    // comming soon
    protected hitbox: any;

    constructor() {
        super();
    }

    init() {}

    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {}
}