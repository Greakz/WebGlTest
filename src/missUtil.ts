const quat = require('gl-quat');
const mat4 = require('gl-mat4');
export const EPSILON = 0.000001;

export function quaternionFromEuler(x, y, z) {
    const quaternion = quat.create();
    fromEuler(quaternion, x, y, z);
    return quaternion
}

function fromEuler(out, x, y, z) {
    let halfToRad = 0.5 * Math.PI / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
}

export function mat4FromTranslationRotationScale(q, v, s): Float32Array {
    const mat4result = mat4.create();
    fromRotationTranslationScale(mat4result, q, v, s);
    return mat4result;
}

function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = s[0];
    let sy = s[1];
    let sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

export function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}
export function lookAt(out, eye, center, up) {

    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;

    let eyex = eye[0];

    let eyey = eye[1];

    let eyez = eye[2];

    let upx = up[0];

    let upy = up[1];

    let upz = up[2];

    let centerx = center[0];

    let centery = center[1];

    let centerz = center[2];

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

    return out;

}

export function identity(out) {

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