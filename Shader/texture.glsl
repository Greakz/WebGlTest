/*
    Texture Shaders
    ===============
    Vertex-Shader Source
*/
//#VERTEX-SHADER#//
attribute vec3 vertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform vec4 color;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void) {
    gl_Position = viewMatrix * modelMatrix *  vec4(vertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = color;
}
/*
    Fragment-Shader Source
*/
//#FRAGMENT-SHADER#//
precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void) {
uSampler;
gl_FragColor = (vColor * texture2D(uSampler, vTextureCoord));
}