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


struct DirectionalLight {
    vec3 dir; // dir = direction
    vec3 col; // col = color
    // vec3 amb; // amb = ambient factor
    vec3 diff; // diff = diffuse factor
    // vec3 spec; // spec = specular color factor
};
struct SceneLight {
    // AmbientLight ambient_light;
    DirectionalLight dir_lights[8]; // dir_lights = Directional Lights
    int dir_lights_count;
    // OmniLight omni_lights[64]; // omni = punctual light
    // int omni_lights_count;
    // SpotLight spot_lights[64]; // spot is like omni with a restricting cone
    // int spot_lights_count;
};

uniform SceneLight scene_light;

// Lights
uniform float directionalLightDirections[12];
uniform float directionalLightColors[12];
uniform int directionalLightsCount;

vec3 getDiffuseDirectionalLight() {
    scene_light;
    float summedDifferedLightStrenght = 0.0;
    vec3 summedDiffLight = vec3(0.0);
    for(int i = 0; i < directionalLightsCount; i++) {

        vec3 dl_direction = vec3(directionalLightDirections[i * 3], directionalLightDirections[i * 3 + 1], directionalLightDirections[i * 3 + 2]);
        float directional = dot(faceNormal, dl_direction);

        directional *= -1.0;

        summedDifferedLightStrenght = max(directional, 0.0);
        summedDiffLight = vec3(
            (directionalLightColors[i * 3] * summedDifferedLightStrenght) + summedDiffLight.x,
            (directionalLightColors[i * 3 + 1] * summedDifferedLightStrenght) + summedDiffLight.y,
            (directionalLightColors[i * 3 + 2] * summedDifferedLightStrenght) + summedDiffLight.z
        );
    }
    return summedDiffLight;
}

void main(void) {
    vec3 diffuseLight = getDiffuseDirectionalLight();

    vec4 texelColor = vColor * texture(uSampler, vTextureCoord);
    fragmentColor = vec4((diffuseLight * texelColor.rgb), texelColor.a);
}
