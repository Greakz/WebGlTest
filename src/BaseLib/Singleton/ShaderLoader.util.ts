import CanvasSingleton from './CanvasSingleton';
import { Log } from './Log';
import { Canvas } from './Canvas';
import LogSingleton from './LogSingleton';
import { Shader } from '../Shader/Shader';

export abstract class ShaderLoader {
    static Log: Log = LogSingleton.getInstance();
    static Canvas: Canvas = CanvasSingleton.getInstance();

    static readTextFile(id: string, callback: (compiledProgram: WebGLProgram, gl: WebGL2RenderingContext) => void) {
        let rawFile = new XMLHttpRequest();
        rawFile.open(
            'GET',
            '/Shader/' + id + '.glsl',
            false
        );
        ShaderLoader.Log.info('ShaderLoader', 'Read in Shader: ' + id + '.glsl');
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    let allText = rawFile.responseText;
                    ShaderLoader.parseShader(id, allText, callback);
                } else {
                    ShaderLoader.Log.error('ShaderLoader', 'Could not load Shader into Dom: ' + id)
                }
            } else {
                ShaderLoader.Log.error('ShaderLoader', 'Could not load Shader into Dom: ' + id)
            }
        };
        rawFile.send(null);

    }

    static parseShader(id: string,
                       source: string,
                       finisherCallBack: (compiledProgram: WebGLProgram, gl: WebGL2RenderingContext) => void) {
        let vertexParsed = source.split('//#VERTEX-SHADER#//');
        let vertexSource = vertexParsed[1];
        let fragSource = '';
        let fragParsed = vertexSource.split('//#FRAGMENT-SHADER#//');
        if (fragParsed.length > 1) {
            vertexSource = fragParsed[0];
            fragSource = fragParsed[1];
        } else {
            fragParsed = vertexParsed[0].split('//#FRAGMENT-SHADER#//');
            fragSource = fragParsed[1];
        }
        fragSource = ShaderLoader.killEmptyLines(fragSource);
        vertexSource = ShaderLoader.killEmptyLines(vertexSource);
        const vs = ShaderLoader.buildVertexShaderWithSource(id, vertexSource);
        const fs = ShaderLoader.buildFragmentShaderWithSource(id, fragSource);
        const compiledProgram = ShaderLoader.buildShaderProgram(id, vs, fs);
        finisherCallBack(compiledProgram, ShaderLoader.Canvas.getGl());
    }

    static killEmptyLines(value: string): string {
        const parts = value.split('\n');
        let result: string = '';
        for(let i = 0; i < parts.length; i++) {
            if(parts[i].trim() !== '') {
                result += parts[i] + '\n';
            }
        }
        return result;
    }

    static buildShaderProgram(id: string, vs_shader: WebGLShader, fs_shader: WebGLShader): WebGLProgram {
        const gl = ShaderLoader.Canvas.getGl();

        let shaderProgram: WebGLProgram = gl.createProgram();
        if (shaderProgram !== null) {
            const compiledProgram = shaderProgram;
            gl.attachShader(compiledProgram, vs_shader);
            gl.attachShader(compiledProgram, fs_shader);
            gl.linkProgram(compiledProgram);
            return compiledProgram;
        } else {
            ShaderLoader.Log.error('ShaderLoader', 'Could not create WebGl-Program: ' + id + '.glsl');
        }
    }

    static buildFragmentShaderWithSource(id: string, source: string): WebGLShader {
        const gl = ShaderLoader.Canvas.getGl();
        let shader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            ShaderLoader.Log.error('ShaderLoader', 'Error while compiling Fragment-Shader: ' + id + '.glsl');
            ShaderLoader.Log.error('ShaderLoader', gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    static buildVertexShaderWithSource(id: string, source: string): WebGLShader {
        const gl = ShaderLoader.Canvas.getGl();
        let shader: WebGLShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            ShaderLoader.Log.error('ShaderLoader', 'Error while compiling Vertex-Shader: ' + id + '.glsl');
            ShaderLoader.Log.error('ShaderLoader', gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

}
