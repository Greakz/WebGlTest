import { Vao } from './VAO/Vao';
import { HasSingletons } from '../../Singleton/HasSingletons';
import { Shader } from '../../Shader/Shader';
import { Mat4 } from '../../Math/Matrix/mat';
import { HitBox } from './HitBox/HitBox';

export class Model extends HasSingletons{

    // Models can have things like:

    // protected planeVao: Vao<Shader>;
    // protected hitbox: HitBox;

    constructor() {
        super();
    }

    init() {}

    render(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4) {}
}