/*
    Texture Shaders
    ===============
    Vertex-Shader Source
*/
//#VERTEX-SHADER#//
#version 300 es
in vec3 vertexPosition;
in vec2 aTextureCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform vec4 color;

out vec2 vTextureCoord;
out vec4 vColor;

void main(void) {
    gl_Position = viewMatrix * modelMatrix *  vec4(vertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = color;
}
/*
    Fragment-Shader Source
*/
//#FRAGMENT-SHADER#//
#version 300 es
precision mediump float;
in vec2 vTextureCoord;
in vec4 vColor;
out vec4 fragmentColor;

uniform sampler2D uSampler;

void main(void) {
    uSampler;
    fragmentColor = (vColor * texture(uSampler, vTextureCoord));
}