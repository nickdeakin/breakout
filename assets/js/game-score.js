'use strict';

class GameScore {
    canvas;
    ctx;
    canCollide = false;
    score = 0;

    textParams = {
        textType: 'fill',
        font: '24px Verdana',
        fillStyle: 'white',
        x: 16,
        y: 16,
        maxWidth: 300,
        textAlign: 'right',
        textBaseline: 'hanging'
    };

    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.textParams.x = this.canvas.width - 16;
    }

    reset = () => {
        this.score = 0;
    }

    addScore = x => {
        this.score += x;
    }

    update = () => {

    }

    draw = () => {
        drawText(this.ctx, this.textParams, `Score: ${this.score}`);
    }
}
