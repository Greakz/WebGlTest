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

struct AmbientLight {
    vec3 color;
};
struct DirectionalLight {
    vec4 dir; // dir = direction
    vec3 col; // col = color
    vec3 amb; // amb = ambient factor
    vec3 diff; // diff = diffuse factor
    vec3 spec; // spec = specular color factor
};
struct OmniLight {
    vec4 pos; // pos = position
    vec3 col; // col = color
    vec3 amb; // amb = ambient factor
    vec3 diff; // diff = diffuse factor
    vec3 spec; // spec = specular color factor
};
struct SpotLight {
    vec4 pos; // pos = position
    vec3 dir; // dir = direction
    vec3 c_angle; // c_angle = cone_angle
    vec3 col; // col = color
    vec3 amb; // amb = ambient factor
    vec3 diff; // diff = diffuse factor
    vec3 spec; // spec = specular color factor
};

uniform light {
    AmbientLight amb_lights[2];
    DirectionalLight dir_lights[8];
    OmniLight omni_lights[32];
    SpotLight spot_lights[32];
};

vec3 calculateDirectionalDiffuseLight(int i) {
        float hitAngleFactor = dot(faceNormal, dir_lights[i].dir.xyz);
        float strenght = max(hitAngleFactor * -1.0, 0.0);
        return dir_lights[i].col * vec3(strenght);
}

vec3 calculateAllDirectionalDiffuseLights() {
    vec3 sumDirDiffLight = vec3(0.0);
    for(int i = 0; i < 8; i++){
        if(dir_lights[i].dir.a > 0.5) {
            sumDirDiffLight += calculateDirectionalDiffuseLight(i);
        }
    }
    return sumDirDiffLight;
}

void main(void) {
    vec3 diffuseLight = calculateAllDirectionalDiffuseLights();

    vec4 texelColor = vColor * texture(uSampler, vTextureCoord);
    fragmentColor = vec4(spot_lights[0].col, 1.0); //vec4((diffuseLight * texelColor.rgb), texelColor.a);
}
