'use strict';

class Paddle {
    canvas;
    ctx;
    canCollide = true;

    image;
    src;
    properties;
 
    gravity = 0;
    vy = 0;

    x = 400;
    y = 500;
    width = 100;
    height = 20;
    fillStyle = 'rgba(210, 210, 210, 1)';

    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.y = this.canvas.height - 20 - this.height;
        this.x = (this.canvas.width / 2) - (this.width / 2);
    }

    update = () => {
    };

    draw = () => {
        fillRect(this.ctx, this);
    };

    testCollision = other => {
        return false;
    };

    didCollide = event => {
    };

    mouseMove = (event) => {
        this.x = event.offsetX;
        if (this.x + this.width > this.canvas.width) {
            this.x = this.canvas.width - this.width;
        } else 
        if (this.x < 0) {
            this.x = 0;
        }
    }

}
