'use strict';

class GameBackground {
    canvas;
    ctx;
    canCollide = false;
    backgroundColor;

    constructor(ctx, canvas, color) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.backgroundColor = {
            fillStyle: color,
            fullscreen: true
        }
    }

    update = () => {
    };

    draw = () => {    
        fillRect(this.ctx, this.backgroundColor);
    };

}
