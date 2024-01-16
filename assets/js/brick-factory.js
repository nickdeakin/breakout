'use strict';

class BrickFactory {
    canvas;
    ctx;
    canCollide = true;
    brickScore = 5;
    frequency = 500;
    bricks = [];
    interval;
    scoreDelegate = amount => {};

    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    generateBricks = () => {
        this.interval = setInterval(() => {

            if (this.bricks.length > 0) {
                return;
            } else {
                const brick = new Brick(this.ctx, this.canvas);
                const x = 425;
                const y = 300;
                brick.x = x;
                brick.y = y;
                brick.scoreDelegate = this.scoreDelegate;
                this.bricks.push(brick);
                return;
            }

            const brick = new Brick(this.ctx, this.canvas);
            const x = getRandomInt(0, this.canvas.width - brick.width);
            const y = getRandomInt(0, (this.canvas.height / 2) - brick.height);
            brick.x = x;
            brick.y = y;
            brick.scoreDelegate = this.scoreDelegate;
            this.bricks.push(brick);
        }, this.frequency);
    }

    removeDeadBricks = () => {
        this.bricks = this.bricks.filter(x => x.life > 0);
    }

    update = () => {
        this.removeDeadBricks();
    }

    draw = () => {
        this.bricks.forEach(x => x.draw());
    }

    testCollision = other => {
        this.bricks.forEach(x => {
            if (other.canCollide && x.canCollide) {
                const collision = x.testCollision(other);
                if (collision) {
                    x.didCollide(other, collision);
                }
            }
        });
    };
}
