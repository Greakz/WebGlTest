/*
    Texture Shaders
    ===============
    Vertex-Shader Source
*/
//#VERTEX-SHADER#//
#version 300 es
in vec3 vertexPosition;
in vec3 vertexNormals;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;

out vec4 vColor;

void main(void) {
    gl_Position = projectionMatrix * modelMatrix * vec4(vertexPosition, 1.0);
    vColor = vec4(vec3(
        abs(vertexNormals.r),
        abs(vertexNormals.g),
        abs(vertexNormals.b)
    ), 1.0);
}
/*
Fragment-Shader Source
*/
//#FRAGMENT-SHADER#//
#version 300 es
precision mediump float;
in vec4 vColor;
out vec4 fragmentColor;

void main(void) {
    vColor;
    fragmentColor = vColor;
}