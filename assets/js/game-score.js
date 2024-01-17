'use strict';

class GameScore {
    canvas;
    ctx;
    canCollide = false;
    score = 0;
    lives = 3;

    scoreTextParams = {
        textType: 'fill',
        font: '24px Verdana',
        fillStyle: 'white',
        x: 16,
        y: 16,
        maxWidth: 300,
        textAlign: 'right',
        textBaseline: 'hanging'
    };

    livesTextParams = {
        textType: 'fill',
        font: '24px Verdana',
        fillStyle: 'white',
        x: 16,
        y: 16,
        maxWidth: 300,
        textAlign: 'left',
        textBaseline: 'hanging'
    };

    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.scoreTextParams.x = this.canvas.width - 16;
        this.livesTextParams.x = 16;
    }

    reset = () => {
        this.score = 0;
    }

    addScore = x => {
        this.score += x;
    }

    deductLife = () => {
        this.lives--;
    }

    update = () => {

    }

    draw = () => {
        drawText(this.ctx, this.scoreTextParams, `Score: ${this.score}`);
    
        drawText(this.ctx, this.livesTextParams, `Lives: ${this.lives}`);
    }
}
