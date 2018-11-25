import { Vec3 } from '../MathTypes/Types/vectors';
import { Mat4 } from '../MathTypes/Types/matrix';
import { compareVec3AGreaterB, multiplyMat4WithVec3, subtractVec3s } from '../MathTypes/vector.util';
import { Ray } from '../Ray';
import { multiplyMatrices } from '../MathTypes/matrix.util';
var intersect = require('ray-triangle-intersection')

export class Hitbox {

    private polygons: HitBoxPolygon[];

    constructor(polygons: HitBoxPolygon[]) {
        this.polygons = polygons;
    }

    testRay(ray: Ray, modelMatrix: Mat4, camPos: Vec3): Vec3 | null {
        return this.polygons.reduce(
            (acc: Vec3 | null, polygon: HitBoxPolygon) => {
                const inViewSpace: HitBoxPolygon = transformToViewSpace(polygon, modelMatrix);
                const tri: number[][] = hitBoxPolygonToLibForm(inViewSpace);
                const pt: number[] = [ray.pos.x, ray.pos.y, ray.pos.z];
                const dir = [ray.dir.x, ray.dir.y, ray.dir.z];
                const result = intersect([], pt, dir, tri);
                if(result !== null) {
                    let res: Vec3 = {x: result[0], y: result[1], z: result[2]};
                    if(acc === null || compareVec3AGreaterB(subtractVec3s(acc, camPos), subtractVec3s(res, camPos))) {
                        return res
                    }
                }
                return acc;
            },
            null
        );
    }

}

export interface HitBoxPolygon {
    first: Vec3;
    second: Vec3;
    third: Vec3;
}

function transformToViewSpace(hitBoxPolygon: HitBoxPolygon, modelMatrix: Mat4) {
    return {
        first: multiplyMat4WithVec3(modelMatrix, hitBoxPolygon.first),
        second: multiplyMat4WithVec3(modelMatrix, hitBoxPolygon.second),
        third: multiplyMat4WithVec3(modelMatrix, hitBoxPolygon.third)
    };
}

function hitBoxPolygonToLibForm(hbp: HitBoxPolygon): number[][] {
    return [
        [hbp.first.x, hbp.first.y, hbp.first.z],
        [hbp.second.x, hbp.second.y, hbp.second.z],
        [hbp.third.x, hbp.third.y, hbp.third.z]
    ]
}