
export class ShaderLoader {

    static shaderList: string[] = [
        'cube',
        'simple'
    ];

    static combinedShaderList: string = '';
    static loadShaders(callBack: () => void) {
        ShaderLoader.loadShader(0, callBack);
    }

    static loadShader(iteration, finisherCallBack: () => void) {
        readTextFile(
            '/Shader/' + ShaderLoader.shaderList[iteration] + '.shader.html',
            (shaderContent: string) => {
                    this.combinedShaderList += shaderContent;
                    iteration++;
                    if(ShaderLoader.shaderList.length > iteration) {
                        this.loadShader(iteration, finisherCallBack)
                    }else{
                        ShaderLoader.appendShaderToDom(finisherCallBack)
                    }
            }
        )
    }

    static appendShaderToDom(finisherCallBack: () => void) {
        const elem: HTMLElement = document.getElementById('shader-space');
        elem.innerHTML = this.combinedShaderList;
        finisherCallBack();
    }

    static loadShaderFromDom(id: string, gl: WebGLRenderingContext): WebGLShader {
        var shaderScript: any = document.getElementById(id);

        if (!shaderScript) {
            return null;
        }

        var theSource: string = '';
        var currentChild = shaderScript.firstChild;

        while (currentChild) {
            if (currentChild.nodeType == 3) {
                theSource += currentChild.textContent;
            }

            currentChild = currentChild.nextSibling;
        }

        var shader: any;

        if (shaderScript.type == 'x-shader/x-fragment') {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == 'x-shader/x-vertex') {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
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
}

function readTextFile(file, callback: (allText: string) => void)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                callback(allText);
            }
        }
    }
    rawFile.send(null);
}