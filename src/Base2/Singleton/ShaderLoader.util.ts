import CanvasSingleton from './CanvasSingleton';
import { Log } from './Log';
import { Canvas } from './Canvas';
import LogSingleton from './LogSingleton';
import { Shader } from '../Shader/Shader';

export abstract class ShaderLoader {
    static Log: Log = LogSingleton.getInstance();
    static Canvas: Canvas = CanvasSingleton.getInstance();
    static readTextFile(id: string, callback: (allText: string) => void) {
        let rawFile = new XMLHttpRequest();
        rawFile.open(
            'GET',
            '/Shader/' + id + '.shader.html',
            false
        );
        ShaderLoader.Log.info('ShaderLoader', 'Read in Shader: ' + id);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    let allText = rawFile.responseText;
                    callback(allText);
                } else {
                    ShaderLoader.Log.error('ShaderLoader', 'Could not load Shader into Dom: ' + id)
                }
            }else {
                ShaderLoader.Log.error('ShaderLoader', 'Could not load Shader into Dom: ' + id)
            }
        };
        rawFile.send(null);

    }
    static shaderToDom(content: string, id: string): void {
        ShaderLoader.Log.info('ShaderLoader', 'Added Shader to DOM: ' + id)
        const elem: HTMLElement = document.getElementById('shader-space');
        const newElem: HTMLElement = document.createElement('div');
        newElem.innerHTML = content
        newElem.setAttribute('id', 'shader-' + id);
        elem.appendChild(newElem);
    }
    static loadShaderFromDom(id: string): WebGLShader {
        let shaderScript: any = document.getElementById(id);
        const gl = ShaderLoader.Canvas.getGl();
        if (!shaderScript) {
            ShaderLoader.Log.error('ShaderLoader', 'Could not find ShaderScript: ' + id);
            return null;
        }

        let theSource: string = '';
        let currentChild = shaderScript.firstChild;

        while (currentChild) {
            if (currentChild.nodeType == 3) {
                theSource += currentChild.textContent;
            }

            currentChild = currentChild.nextSibling;
        }

        let shader: WebGLShader;

        if (shaderScript.type == 'x-shader/x-fragment') {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == 'x-shader/x-vertex') {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            ShaderLoader.Log.error('ShaderLoader', 'Could not Load Shader From Dom: ' + id);
            return null;  // Unbekannter Shadertyp
        }

        gl.shaderSource(shader, theSource);

        // Kompiliere das Shaderprogramm

        gl.compileShader(shader);

        // Überprüfe, ob die Kompilierung erfolgreich war

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('Es ist ein Fehler beim Kompilieren der Shader aufgetaucht: ' + gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    static attachAndLinkShader(shader: Shader) {
        const vertexShader = ShaderLoader.loadShaderFromDom(shader.shader_identifier + '-vs');
        const fragmentShader = ShaderLoader.loadShaderFromDom(shader.shader_identifier + '-fs');
        const gl = ShaderLoader.Canvas.getGl();

        let shaderProgram: WebGLProgram = gl.createProgram();
        if (shaderProgram !== null) {
            const compiledProgram = shaderProgram;

            gl.attachShader(compiledProgram, vertexShader);
            gl.attachShader(compiledProgram, fragmentShader);
            gl.linkProgram(compiledProgram);

            shader.setProgram(
                vertexShader,
                fragmentShader,
                compiledProgram,
                gl
            );
            ShaderLoader.Log.info('ShaderLoader', 'Created ShaderProgram: ' + shader.shader_identifier)
        } else {
            ShaderLoader.Log.error('ShaderLoader', 'Could not create WebGl-Program');
        }
    }

}
