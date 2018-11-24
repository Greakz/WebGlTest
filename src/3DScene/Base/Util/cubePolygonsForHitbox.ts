import { HitBoxPolygon } from '../WorldObject/Hitbox';

export function cubePolygonsForHitbox(): HitBoxPolygon[] {

    const vertices = [
        // vordere Fläche
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // hintere Fläche
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // obere Fläche
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // untere Fläche
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // rechte Fläche
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // linke Fläche
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0
    ];
    const indices = [
        0,  1,  2,      0,  2,  3,    // vorne
        4,  5,  6,      4,  6,  7,    // hinten
        8,  9,  10,     8,  10, 11,   // oben
        12, 13, 14,     12, 14, 15,   // unten
        16, 17, 18,     16, 18, 19,   // rechts
        20, 21, 22,     20, 22, 23    // links
    ];
    let result: HitBoxPolygon[] = [];
    for(let i = 0; i < indices.length; i+=3) {

        let fIndex: number = indices[i] * 3;
        let sIndex: number = indices[i+1] * 3;
        let tIndex: number = indices[i+2] * 3;
        result.push({
            first: {x: vertices[fIndex], y: vertices[fIndex+1], z: vertices[fIndex+2]},
            second: {x: vertices[sIndex], y: vertices[sIndex+1], z: vertices[sIndex+2]},
            third: {x: vertices[tIndex], y: vertices[tIndex+1], z: vertices[tIndex+2]},
        })
    }
    return result;
}