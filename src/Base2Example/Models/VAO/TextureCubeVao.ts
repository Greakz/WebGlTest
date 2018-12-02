import { Vao } from '../../../Base2/Object/Model/VAO/Vao';
import { TextureShader } from '../../Shader/TextureShader';
import { TextureProvider } from '../../../Base2/Singleton/TextureProvider';
import { WoodTexture } from '../Texture/WoodTexture';

const yGrid = 0.0001;

export class TextureCubeVao extends Vao<TextureShader> {
    vao_identifier: string = 'cubet';
    protected vertices: number[] = [
        // vordere Fläche
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,

        // hintere Fläche
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,

        // obere Fläche
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,

        // untere Fläche
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,

        // rechte Fläche
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,

        // linke Fläche
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5
    ];
    protected indices: number[] = [
        0, 1, 2, 0, 2, 3,    // vorne
        4, 5, 6, 4, 6, 7,    // hinten
        8, 9, 10, 8, 10, 11,   // oben
        12, 13, 14, 12, 14, 15,   // unten
        16, 17, 18, 16, 18, 19,   // rechts
        20, 21, 22, 20, 22, 23    // links
    ];

    constructor() {
        super(TextureCubeVao.ShaderProvider.getShader(new TextureShader()));
    }
    private texture: WoodTexture;

    init(GL: WebGL2RenderingContext, shader: TextureShader) {
        this.texture = TextureCubeVao.TextureProvider.getTexture(new WoodTexture());

        let vertexBuffer: WebGLBuffer = GL.createBuffer();
        let indicesBuffer: WebGLBuffer = GL.createBuffer();

        let vao: WebGLVertexArrayObject = GL.createVertexArray();
        GL.bindVertexArray(vao);

        GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.vertices), GL.STATIC_DRAW);
        GL.vertexAttribPointer(this.shader.attr_position, 3, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(this.shader.attr_position);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), GL.STATIC_DRAW);

        this.texture.vaoExtension(GL, shader);

        this.vao = vao;
        GL.bindVertexArray(null);

        if(!GL.isVertexArray(this.vao)) {
            Vao.Log.error('VAO', 'Cant create Vao: ' + this.vao_identifier)
        }
    }
}