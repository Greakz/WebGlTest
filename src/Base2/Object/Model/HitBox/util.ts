import { HitBoxPolygon } from './HitBoxPolygon';

export function getHitBoxPolygonsFromVertexAndIndices(vertex: number[], indices: number[]) {
    let hitBoxPolygons: HitBoxPolygon[] = [];
    for(let i = 0; i < indices.length; i+= 3) {

        let va_start = indices[i] * 3;
        let vb_start = indices[i+1] * 3;
        let vc_start = indices[i+2] * 3;

        hitBoxPolygons.push({
            a: {x: vertex[va_start], y: vertex[va_start + 1], z: vertex[va_start + 2]},
            b: {x: vertex[vb_start], y: vertex[vb_start + 1], z: vertex[vb_start + 2]},
            c: {x: vertex[vc_start], y: vertex[vc_start + 1], z: vertex[vc_start + 2]},
        })
    }
    return hitBoxPolygons;
}