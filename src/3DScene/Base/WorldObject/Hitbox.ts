import { Vec3 } from '../MathTypes/Types/vectors';
import { Mat4 } from '../MathTypes/Types/matrix';
import { multiplyMat4WithVec3 } from '../MathTypes/vector.util';
import { Ray } from '../Ray';
import { multiplyMatrices } from '../MathTypes/matrix.util';
var intersect = require('ray-triangle-intersection')

export class Hitbox {

    private polygons: HitBoxPolygon[];

    constructor(polygons: HitBoxPolygon[]) {
        this.polygons = polygons;
    }

    testRay(ray: Ray, viewMatrix: Mat4, modelMatrix: Mat4) {
        let hit = false;
        this.polygons.forEach(
            (polygon: HitBoxPolygon) => {
                const inViewSpace: HitBoxPolygon = transformToViewSpace(polygon, viewMatrix, modelMatrix);
                const tri: number[][] = hitBoxPolygonToLibForm(inViewSpace);
                const pt: number[] = [ray.pos.x, ray.pos.y, ray.pos.z];
                const dir = [ray.dir.x, ray.dir.y, ray.dir.z];
                const result = intersect([], pt, dir, tri);
                if(result !== null) {
                    hit = true;
                }
            }
        );
        return hit;
    }

}

export interface HitBoxPolygon {
    first: Vec3;
    second: Vec3;
    third: Vec3;
}

function transformToViewSpace(hitBoxPolygon: HitBoxPolygon, viewMatrix: Mat4, modelMatrix: Mat4) {
    const scale = multiplyMatrices(viewMatrix, modelMatrix);
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