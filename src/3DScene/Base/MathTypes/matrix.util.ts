import { Mat4 } from './Types/matrix';
import { Vec3, Vec4 } from './Types/vectors';

export const EPSILON = 0.000001;

const c = Math.cos;
const s = Math.sin;
const t = Math.tan;

export function mat4ToFloat32Array(matrix: Mat4): Float32Array {
    return new Float32Array(mat4ToFlat(matrix));
}

export function mat4ToFlat(matrix: Mat4): number[] {
    let result: number [] = [];
    for (let i = 0; i < 16; i++) {
        let row = Math.floor(i / 4);
        result.push(matrix[row][i % 4]);
    }
    return result;
}

export function mat4FromFlat(m: number[]): Mat4 {
    return [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];
}

export function mat4FromFlatF32(m: Float32Array): Mat4 {
    return [
        [m[0], m[1], m[2], m[3]],
        [m[4], m[5], m[6], m[7]],
        [m[8], m[9], m[10], m[11]],
        [m[12], m[13], m[14], m[15]]
    ];
}

export function getRotationXMatrix(rad: number): Mat4 {
    return [
        [1, 0, 0, 0],
        [0, c(rad), -s(rad), 0],
        [0, s(rad), c(rad), 0],
        [0, 0, 0, 1],
    ]
}

export function getRotationYMatrix(rad: number): Mat4 {
    return [
        [c(rad), 0, s(rad), 0],
        [0, 1, 0, 0],
        [-s(rad), 0, c(rad), 0],
        [0, 0, 0, 1],
    ]
}

export function getRotationZMatrix(rad: number): Mat4 {
    return [
        [c(rad), -s(rad), 0, 0],
        [s(rad), c(rad), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
}

export function getTranslationMatrix(x: number, y: number, z: number): Mat4 {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [x, y, z, 1]
    ]
}

export function getScalingMatrix(w: number, h: number, d: number): Mat4 {
    return [
        [w, 0, 0, 0],
        [0, h, 0, 0],
        [0, 0, d, 0],
        [0, 0, 0, 1]
    ]
}

export function getPerspectiveMatrix(fovRad: number, aspect: number, near: number, far: number): Mat4 {
    let f = 1.0 / Math.tan(fovRad / 2);
    let rangeInv = 1 / (near - far);
    return [
        [f / aspect, 0, 0, 0],
        [0, f, 0, 0],
        [0, 0, (near + far) * rangeInv, -1],
        [0, 0, near * far * rangeInv * 2, 0]
    ]
}

export function getOrthographicMatrix(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);

    let row4col1 = (left + right) * lr;
    let row4col2 = (top + bottom) * bt;
    let row4col3 = (far + near) * nf;

    return [
        [-2 * lr, 0, 0, 0],
        [0, -2 * bt, 0, 0],
        [0, 0, 2 * nf, 0],
        [row4col1, row4col2, row4col3, 1]
    ];
}
export function multiplyMatrices(aAsMat4: Mat4, bAsMat4: Mat4): Mat4 {

    let a = mat4ToFlat(aAsMat4);
    let b = mat4ToFlat(bAsMat4);

    let result = [];

    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    result[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    result[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    result[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    result[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return mat4FromFlat(result);
}

export function multiplyArrayOfMatrices(matrices: Mat4[]) {

    let inputMatrix = matrices[0];

    for (let i = 1; i < matrices.length; i++) {
        inputMatrix = multiplyMatrices(inputMatrix, matrices[i]);
    }

    return inputMatrix;
}

export function radians(degrees: number) {
    return (degrees / 360) * 2 * Math.PI;
}

export function lookAtMatrix(eye: Vec3, center: Vec3, up: Vec3): Mat4 {
    let out: number[] = [];

    out = identity(out);

    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;

    let eyex = eye.x;

    let eyey = eye.y;

    let eyez = eye.z;

    let upx = up.x;

    let upy = up.y;

    let upz = up.z;

    let centerx = center.x;

    let centery = center.y;

    let centerz = center.z;

    if (Math.abs(eyex - centerx) < EPSILON &&

        Math.abs(eyey - centery) < EPSILON &&

        Math.abs(eyez - centerz) < EPSILON) {

        return identity(out);
    }

    z0 = eyex - centerx;

    z1 = eyey - centery;

    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);

    z0 *= len;

    z1 *= len;

    z2 *= len;

    x0 = upy * z2 - upz * z1;

    x1 = upz * z0 - upx * z2;

    x2 = upx * z1 - upy * z0;

    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

    if (!len) {

        x0 = 0;

        x1 = 0;

        x2 = 0;

    } else {

        len = 1 / len;

        x0 *= len;

        x1 *= len;

        x2 *= len;

    }

    y0 = z1 * x2 - z2 * x1;

    y1 = z2 * x0 - z0 * x2;

    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

    if (!len) {

        y0 = 0;

        y1 = 0;

        y2 = 0;

    } else {

        len = 1 / len;

        y0 *= len;

        y1 *= len;

        y2 *= len;

    }

    out[0] = x0;

    out[1] = y0;

    out[2] = z0;

    out[3] = 0;

    out[4] = x1;

    out[5] = y1;

    out[6] = z1;

    out[7] = 0;

    out[8] = x2;

    out[9] = y2;

    out[10] = z2;

    out[11] = 0;

    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);

    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);

    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);

    out[15] = 1;

    return mat4FromFlat(out);

}

function identity(out) {

    out[0] = 1;

    out[1] = 0;

    out[2] = 0;

    out[3] = 0;

    out[4] = 0;

    out[5] = 1;

    out[6] = 0;

    out[7] = 0;

    out[8] = 0;

    out[9] = 0;

    out[10] = 1;

    out[11] = 0;

    out[12] = 0;

    out[13] = 0;

    out[14] = 0;

    out[15] = 1;

    return out;

}