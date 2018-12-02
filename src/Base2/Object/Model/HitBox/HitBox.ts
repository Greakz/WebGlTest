import { HitBoxPolygon } from './HitBoxPolygon';
import { Vec3 } from '../../../Math/Vector/vec';
import { Mat4 } from '../../../Math/Matrix/mat';
import { Ray } from '../../../Math/Ray/Ray';
import { multiplyMat4Vec3 } from '../../../Math/Vector/multiply';
import { compareVec3AGreaterB } from '../../../Math/Vector/compare';
import { subtractVec3 } from '../../../Math/Vector/subtract';
var intersect = require('ray-triangle-intersection')

export class HitBox {
    hitBoxPolygons: HitBoxPolygon[];
    constructor(hitBoxPolygons: HitBoxPolygon[]) {
        this.hitBoxPolygons = hitBoxPolygons;
    }
    checkHit(ray: Ray, modelMat: Mat4, camPos: Vec3): Vec3 | null {
        return this.hitBoxPolygons.reduce(
            (acc: Vec3 | null, hitboxPolygon: HitBoxPolygon) => {
                const inViewSpace: HitBoxPolygon = transformWithModelMat(hitboxPolygon, modelMat);
                const tri: number[][] = hitBoxPolygonToLibForm(inViewSpace);
                const pt: number[] = [ray.position.x, ray.position.y, ray.position.z];
                const dir = [ray.direction.x, ray.direction.y, ray.direction.z];
                const result = intersect([], pt, dir, tri);
                if(result !== null) {
                    let res: Vec3 = {x: result[0], y: result[1], z: result[2]};
                    if(acc === null || compareVec3AGreaterB(subtractVec3(acc, camPos), subtractVec3(res, camPos))) {
                        return res
                    }
                }
                return acc;
            },
            null
        )
    }
}


function transformWithModelMat(hitBoxPolygon: HitBoxPolygon, modelMatrix: Mat4): HitBoxPolygon {
    return {
        a: multiplyMat4Vec3(modelMatrix, hitBoxPolygon.a),
        b: multiplyMat4Vec3(modelMatrix, hitBoxPolygon.b),
        c: multiplyMat4Vec3(modelMatrix, hitBoxPolygon.c)
    };
}

function hitBoxPolygonToLibForm(hbp: HitBoxPolygon): number[][] {
    return [
        [hbp.a.x, hbp.a.y, hbp.a.z],
        [hbp.b.x, hbp.b.y, hbp.b.z],
        [hbp.c.x, hbp.c.y, hbp.c.z]
    ]
}