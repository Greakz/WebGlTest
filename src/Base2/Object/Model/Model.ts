import { Vao } from './VAO/Vao';
import { HasSingletons } from '../../Singleton/HasSingletons';
import { Shader } from '../../Shader/Shader';
import { Transformation } from './Transformation';
import { Mat4 } from '../../Math/Matrix/mat';

export class Model extends HasSingletons{

    protected vao: Vao;
    protected shader: Shader;
    protected transformation: Transformation = new Transformation();
    // comming soon
    protected hitbox: any;

    constructor() {
        super();
    }

    init() {}

    render(GL: WebGL2RenderingContext, projMat: Mat4) {}
}