import { HitBox } from '../../../Base2/Object/Model/HitBox/HitBox';
import { getHitBoxPolygonsFromVertexAndIndices } from '../../../Base2/Object/Model/HitBox/util';

export class CubeHitBox extends HitBox {

    private vertices = [
        // vordere Fläche
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,

        // hintere Fläche
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,

        // obere Fläche
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,

        // untere Fläche
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,

        // rechte Fläche
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,

        // linke Fläche
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5
    ];

    private indices = [
        0, 1, 2, 0, 2, 3,    // vorne
        4, 5, 6, 4, 6, 7,    // hinten
        8, 9, 10, 8, 10, 11,   // oben
        12, 13, 14, 12, 14, 15,   // unten
        16, 17, 18, 16, 18, 19,   // rechts
        20, 21, 22, 20, 22, 23    // links
    ];

    constructor() {
        super(getHitBoxPolygonsFromVertexAndIndices(
            [
                // vordere Fläche
                -0.5, -0.5, 0.5,
                0.5, -0.5, 0.5,
                0.5, 0.5, 0.5,
                -0.5, 0.5, 0.5,

                // hintere Fläche
                -0.5, -0.5, -0.5,
                -0.5, 0.5, -0.5,
                0.5, 0.5, -0.5,
                0.5, -0.5, -0.5,

                // obere Fläche
                -0.5, 0.5, -0.5,
                -0.5, 0.5, 0.5,
                0.5, 0.5, 0.5,
                0.5, 0.5, -0.5,

                // untere Fläche
                -0.5, -0.5, -0.5,
                0.5, -0.5, -0.5,
                0.5, -0.5, 0.5,
                -0.5, -0.5, 0.5,

                // rechte Fläche
                0.5, -0.5, -0.5,
                0.5, 0.5, -0.5,
                0.5, 0.5, 0.5,
                0.5, -0.5, 0.5,

                // linke Fläche
                -0.5, -0.5, -0.5,
                -0.5, -0.5, 0.5,
                -0.5, 0.5, 0.5,
                -0.5, 0.5, -0.5
            ],
            [
                0, 1, 2, 0, 2, 3,    // vorne
                4, 5, 6, 4, 6, 7,    // hinten
                8, 9, 10, 8, 10, 11,   // oben
                12, 13, 14, 12, 14, 15,   // unten
                16, 17, 18, 16, 18, 19,   // rechts
                20, 21, 22, 20, 22, 23    // links
            ]
        ));
    }
}