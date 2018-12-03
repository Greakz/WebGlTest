/*
    Texture Shaders
    ===============
    Vertex-Shader Source
*/
//#VERTEX-SHADER#//
#version 300 es
in vec3 vertexPosition;
in vec3 vertexNormals;
in vec2 aTextureCoord;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform vec4 color;

out vec2 vTextureCoord;
out vec4 vColor;
out vec3 faceNormal;

void main(void) {
    gl_Position = viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = color;
    faceNormal = vertexNormals;
}
/*
    Fragment-Shader Source
*/
//#FRAGMENT-SHADER#//
#version 300 es
precision mediump float;
// Input from Pipeline
in vec3 faceNormal;
in vec2 vTextureCoord;
in vec4 vColor;

// Result output
out vec4 fragmentColor;

// Texture
uniform sampler2D uSampler;

// Lights
// uniform vec4 ambientLights[4];
// uniform int ambientLightsCount;
uniform float directionalLightDirections[12];
uniform float directionalLightColors[16];
uniform int directionalLightsCount;
// uniform vec3 punctualLights[32];
// uniform int punctualLightsCount;

vec4 calculateDirectionalLight() {
    float summedDifferedLightStrenght = 0.0;
    vec4 summedDiffLight = vec4(0.0);
    for(int i = 0; i < directionalLightsCount; i++) {
        vec3 dl_direction = vec3(directionalLightDirections[i * 3], directionalLightDirections[i * 3 + 1], directionalLightDirections[i * 3 + 2]);
        float directional = dot(faceNormal, dl_direction) / (length(faceNormal) * length(dl_direction));
        summedDifferedLightStrenght += max(directional, 0.0);
        summedDiffLight = vec4(
            directionalLightColors[i * 4] + summedDiffLight.x,
            directionalLightColors[i * 4 + 1] + summedDiffLight.y,
            directionalLightColors[i * 4 + 2] + summedDiffLight.z,
            directionalLightColors[i * 4 + 3] + summedDiffLight.w
        );
    }
    summedDifferedLightStrenght /= float(directionalLightsCount);
    summedDiffLight /= vec4(float(directionalLightsCount));
    summedDiffLight *= vec4(summedDifferedLightStrenght);
    return summedDiffLight;
}

void main(void) {
    vec4 summedDiffLight = calculateDirectionalLight();

    vec4 texelColor = texture(uSampler, vTextureCoord);
    fragmentColor = vColor * vec4(summedDiffLight.rgb * texelColor.rgb, texelColor.a);
}
