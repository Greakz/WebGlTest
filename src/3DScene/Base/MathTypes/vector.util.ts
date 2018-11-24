import { Mat4 } from './Types/matrix';
import { Vec3, Vec4 } from './Types/vectors';
import { mat4ToFlat } from './matrix.util';

export const EPSILON = 0.000001;

const c = Math.cos;
const s = Math.sin;
const t = Math.tan;

export function multiplyMat4WithVec3(matrixIn: Mat4, pointIn: Vec3) {
    return multiplyMat4WithVec4(matrixIn, {...pointIn, w: 1});
}

export function multiplyMat4WithVec4(matrixIn: Mat4, pointIn: Vec4): Vec4 {

    let matrix = mat4ToFlat(matrixIn);
    let point = [pointIn.x, pointIn.y, pointIn.z, pointIn.w];

    let x = point[0], y = point[1], z = point[2], w = point[3];
    let c1r1 = matrix[0], c2r1 = matrix[1], c3r1 = matrix[2], c4r1 = matrix[3],
        c1r2 = matrix[4], c2r2 = matrix[5], c3r2 = matrix[6], c4r2 = matrix[7],
        c1r3 = matrix[8], c2r3 = matrix[9], c3r3 = matrix[10], c4r3 = matrix[11],
        c1r4 = matrix[12], c2r4 = matrix[13], c3r4 = matrix[14], c4r4 = matrix[15];
    return {
        x: x * c1r1 + y * c1r2 + z * c1r3 + w * c1r4,
        y: x * c2r1 + y * c2r2 + z * c2r3 + w * c2r4,
        z: x * c3r1 + y * c3r2 + z * c3r3 + w * c3r4,
        w: x * c4r1 + y * c4r2 + z * c4r3 + w * c4r4
    };
}

export function crossProductVec3(vector_one: Vec3, vector_two: Vec3): Vec3 {
    return {
        x: vector_one.y * vector_two.z - vector_one.z - vector_two.y,
        y: vector_one.z * vector_two.x - vector_one.x * vector_two.z,
        z: vector_one.x * vector_two.y - vector_one.y * vector_two.x
    }
}

export function normalizeVec3(vec: Vec3): Vec3 {
    const scale = 1 / Math.sqrt(
        Math.pow(vec.x * 2, 2)
        + Math.pow(vec.y * 2, 2)
        + Math.pow(vec.z * 2, 2)
    );
    return {
        x: vec.x * scale,
        y: vec.y * scale,
        z: vec.z * scale
    }
}

export function normalizeVec4(vec: Vec4): Vec4 {
    const scale = 1 / Math.sqrt(
        Math.pow(vec.x * 2, 2)
        + Math.pow(vec.y * 2, 2)
        + Math.pow(vec.z * 2, 2)
        + Math.pow(vec.w * 2, 2)
    );
    return {
        x: vec.x * scale,
        y: vec.y * scale,
        z: vec.z * scale,
        w: vec.w * scale
    }
}

export function subtractVec3s(a: Vec3, b: Vec3): Vec3 {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    }
}
export function addVec3s(a: Vec3, b: Vec3): Vec3 {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    }
}
export function scaleVec3(a: Vec3, scalar: number): Vec3 {
    return {
        x: a.x * scalar,
        y: a.y * scalar,
        z: a.z * scalar
    }
}