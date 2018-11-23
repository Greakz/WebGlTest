import { DrawObject } from './DrawObject';
import { Color } from '../Entities/Color';

export class Cube extends DrawObject {
    protected vertexPoints: number[] = [
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
    protected vertexIndices: Uint16Array = new Int16Array([
        0,  1,  2,      0,  2,  3,    // vorne
        4,  5,  6,      4,  6,  7,    // hinten
        8,  9,  10,     8,  10, 11,   // oben
        12, 13, 14,     12, 14, 15,   // unten
        16, 17, 18,     16, 18, 19,   // rechts
        20, 21, 22,     20, 22, 23    // links
    ]);
    protected vertexColors: number[] = [
        1.0,  0.0,  0.0,  1.0,    // hintere Fläche: rot
        0.0,  1.0,  0.0,  1.0,    // obere Fläche: grün
        0.0,  0.0,  1.0,  1.0,    // untere Fläche: blau
        1.0,  1.0,  0.0,  1.0,    // rechte Fläche: gelb
        1.0,  0.0,  1.0,  1.0,     // linke Fläche: violett
        1.0,  1.0,  0.0,  1.0,    // vordere Fläche: weiß
        1.0,  0.0,  0.0,  1.0,    // hintere Fläche: rot
        0.0,  1.0,  0.0,  1.0,    // obere Fläche: grün
        0.0,  0.0,  1.0,  1.0,    // untere Fläche: blau
        1.0,  1.0,  0.0,  1.0,    // rechte Fläche: gelb
        1.0,  0.0,  1.0,  1.0,     // linke Fläche: violett
        1.0,  1.0,  0.0,  1.0,    // vordere Fläche: weiß
    ];
}