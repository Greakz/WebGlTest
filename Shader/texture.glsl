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
out vec3 facePosition;

void main(void) {
    gl_Position = viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = color;
    faceNormal = vertexNormals;
    facePosition = vec3(modelMatrix * vec4(vertexPosition, 1.0));
}
/*
    Fragment-Shader Source
*/
//#FRAGMENT-SHADER#//
#version 300 es
precision mediump float;

// Input from Pipeline
in vec3 faceNormal;
in vec3 facePosition;
in vec2 vTextureCoord;
in vec4 vColor;

// Result output
out vec4 fragmentColor;

const int maxAmbientLights = 2;
const int maxDirectionalLights = 8;
const int maxOmniLights = 32;
const int maxSpotLights = 32;

// Texture
uniform sampler2D uSampler;

struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    vec3 shininess;
};
struct AmbientLight {
    vec4 col; // col = color
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
    vec3 prop_beh; //propagation behaviors x = constant , y=linear, z=quadric
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

uniform light{
    vec3 camera_pos;
    Material material;
    AmbientLight amb_lights[2];
    DirectionalLight dir_lights[8];
    OmniLight omni_lights[32];
    SpotLight spot_lights[32];
};

/*
    LIGHT CALC HELPER
*/
float calculateOmniAttenuation(int i) {
    float distance = length(omni_lights[i].pos.xyz - facePosition);
    return 1.0 / (omni_lights[i].prop_beh.x + omni_lights[i].prop_beh.y * distance +
      			     omni_lights[i].prop_beh.z * (distance * distance));
}
/*
    CALCULATE AMBIENT LIGHT
*/
vec3 calculateAmbientLight(vec3 color) {
    return color * material.ambient;
}

vec3 calculateSimpleAmbientLights() {
     vec3 sumAmbLight = vec3(0.0);
    for(int i = 0; i < maxAmbientLights; i++){
        if(amb_lights[i].col.a > 0.5) {
            sumAmbLight += calculateAmbientLight(amb_lights[i].col.rgb);
        }
    }
    return sumAmbLight;
}

vec3 calculateDirectionalAmbientLight(int i) {
  return calculateAmbientLight(dir_lights[i].col.rgb)
    * dir_lights[i].amb;
}
vec3 calculateAllDirectionalAmbientLights() {
    vec3 sumDirAmbientLight = vec3(0.0);
    for(int i = 0; i < maxDirectionalLights; i++){
        if(dir_lights[i].dir.a > 0.5) {
            sumDirAmbientLight += calculateDirectionalAmbientLight(i);
        }
    }
    return sumDirAmbientLight;
}

vec3 calculateOmniAmbientLight(int i) {
  return calculateAmbientLight(omni_lights[i].col.rgb)
    * omni_lights[i].amb
    * calculateOmniAttenuation(i);
}
vec3 calculateAllOmniAmbientLights() {
    vec3 sumOmniAmbientLight = vec3(0.0);
    for(int i = 0; i < maxOmniLights; i++){
        if(omni_lights[i].pos.a > 0.5) {
            sumOmniAmbientLight += calculateOmniAmbientLight(i);
        }
    }
    return sumOmniAmbientLight;
}

/*
    CALCULATE DIFFUSE LIGHT
*/
vec3 calculateDiffuseLightStrenght(vec3 surfaceNormal, vec3 light_ray_to_surface) {
    float hitAngleFactor = dot(surfaceNormal, light_ray_to_surface);
    float strenght = max(hitAngleFactor * -1.0, 0.0);
    return vec3(strenght) * material.diffuse;
}

vec3 calculateDirectionalDiffuseLight(int i) {
    return calculateDiffuseLightStrenght(faceNormal, dir_lights[i].dir.xyz)
        * dir_lights[i].diff
        * dir_lights[i].col;
}
vec3 calculateAllDirectionalDiffuseLights() {
    vec3 sumDirDiffLight = vec3(0.0);
    for(int i = 0; i < maxDirectionalLights; i++){
        if(dir_lights[i].dir.a > 0.5) {
            sumDirDiffLight += calculateDirectionalDiffuseLight(i);
        }
    }
    return sumDirDiffLight;
}

vec3 calculateOmniDiffuseLight(int i) {
    vec3 dir_vec_to_surface = normalize(omni_lights[i].pos.xyz - facePosition);
    return calculateDiffuseLightStrenght(faceNormal, dir_vec_to_surface)
        * omni_lights[i].diff
        * omni_lights[i].col
        * calculateOmniAttenuation(i);
}
vec3 calculateAllOmniDiffuseLights() {
   vec3 sumOmniDiffLight = vec3(0.0);
    for(int i = 0; i < maxOmniLights; i++){
        if(omni_lights[i].pos.a > 0.5) {
            sumOmniDiffLight += calculateDirectionalDiffuseLight(i);
        }
    }
    return sumOmniDiffLight;
}
/*
    CALCULATE SPECULAR LIGHT
*/
vec3 calculateSpecularLightStrenght(vec3 light_dir) {
    vec3 viewDir = normalize(camera_pos - facePosition);
    vec3 reflectDir = reflect(-light_dir, faceNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess.x);
    return vec3(spec) * material.specular;
}

vec3 calculateDirectionalSpecularLight(int i) {
    return calculateSpecularLightStrenght(dir_lights[i].dir.xyz)
                   * dir_lights[i].spec
                   * dir_lights[i].col;
}
vec3 calculateAllDirectionalSpecularLights() {
    vec3 sumDirSpecLight = vec3(0.0);
    for(int i = 0; i < maxDirectionalLights; i++){
        if(dir_lights[i].dir.a > 0.5) {
            sumDirSpecLight += calculateDirectionalSpecularLight(i);
        }
    }
    return sumDirSpecLight;
}

vec3 calculateOmniSpecularLight(int i) {
    vec3 dir_vec_to_surface = normalize(omni_lights[i].pos.xyz - facePosition);
    return calculateSpecularLightStrenght(dir_vec_to_surface)
                   * omni_lights[i].spec
                   * omni_lights[i].col;
}
vec3 calculateAllOmniSpecularLights() {
    vec3 sumOmniSpecLight = vec3(0.0);
    for(int i = 0; i < maxOmniLights; i++){
        if(omni_lights[i].pos.a > 0.5) {
            sumOmniSpecLight += calculateOmniSpecularLight(i);
        }
    }
    return sumOmniSpecLight;
}

/*
    Combine Everything
*/
void main(void) {
    vec3 ambientLight = calculateSimpleAmbientLights();
    ambientLight += calculateAllDirectionalAmbientLights();
    ambientLight += calculateAllOmniAmbientLights();

    vec3 diffuseLight = calculateAllDirectionalDiffuseLights();
    diffuseLight += calculateAllOmniDiffuseLights();

    vec3 specularLight = calculateAllDirectionalSpecularLights();
    specularLight += calculateAllOmniSpecularLights();


    vec3 lightColor = ambientLight + diffuseLight + specularLight;

    vec4 texelColor = vColor * texture(uSampler, vTextureCoord);
    fragmentColor = vec4((lightColor * texelColor.rgb), texelColor.a);
}
