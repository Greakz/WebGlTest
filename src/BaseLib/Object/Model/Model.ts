import { Mesh } from './Mesh/Mesh';
import { TextureMap } from './Texture/TextureMap';
import { HasProvider } from '../../Singleton/HasSingletons';
import { Shader } from '../../Shader/Shader';
import { Mat4 } from '../../Math/Matrix/mat';
import { Canvas } from '../../Singleton/Canvas';
import CanvasSingleton from '../../Singleton/CanvasSingleton';
import { SceneLightning } from '../../Light/SceneLightning';

export class Model<S extends Shader> extends HasProvider {

    protected static Canvas: Canvas = CanvasSingleton.getInstance();

    model_identifier: string = 'model';
    /**
     * STuff to define
     */
    shader: S;
    mesh: Mesh;
    textures: TextureMap[];
    /**
     * auto stuff
     */
    vao: WebGLVertexArrayObject;

    createModel() {
        const GL: WebGL2RenderingContext = Model.Canvas.getGl();
        this.vao = GL.createVertexArray();
        GL.bindVertexArray(this.vao);

        // create
        this.mesh.createMesh(GL);
        this.textures.forEach((t: TextureMap) => t.createTexture(GL));
        // read shader links
        this.mesh.loadAttributePoiner(GL, this.shader);
        this.textures.forEach((t: TextureMap) => t.loadAttributePoiner(GL, this.shader));
        this.textures.forEach((t: TextureMap) => t.loadUniformLocation(GL, this.shader));
        // build vao


        this.mesh.bindBufferAndSetAttributePointer(GL);
        this.textures.forEach((t: TextureMap) => t.bindBuffer(GL));
        this.textures.forEach((t: TextureMap) => t.setAttributePointer(GL));

        GL.bindVertexArray(null);
    }

    renderModel(GL: WebGL2RenderingContext, projMat: Mat4, modelMat: Mat4, sceneLightning: SceneLightning) {
       // Render Model
    }

}