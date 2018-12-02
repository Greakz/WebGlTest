/*
    Texture Shaders
    ===============
    Fragment-Shader Source
*/
//#FRAGMENT-SHADER#//
precision mediump float;
varying vec4 vColor;

void main(void) {
    gl_FragColor = vColor;
}
/*
    Vertex-Shader Source
*/
//#VERTEX-SHADER#//
attribute vec3 vertexPosition;
varying vec4 vColor;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform vec4 color;

void main(void) {
    gl_Position = projectionMatrix * modelMatrix * vec4(vertexPosition, 1.0);
    vColor = color;
}
