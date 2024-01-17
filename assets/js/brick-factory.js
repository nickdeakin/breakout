'use strict';

class BrickFactory {
    canvas;
    ctx;
    canCollide = true;
    brickScore = 5;
    frequency = 1500;
    bricks = [];
    interval;

    scoreDelegate = amount => {};

    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    generateRandomBricks = () => {
        this.interval = setInterval(() => {

            /*
            if (this.bricks.length > 0) {
                return;
            } else {
                const brick = new Brick(this.ctx, this.canvas);
                const x = 425;
                const y = 250;
                brick.x = x;
                brick.y = y;
                brick.scoreDelegate = this.scoreDelegate;
                this.bricks.push(brick);
                return;
            }
            */

            const brick = new Brick(this.ctx, this.canvas);
            const x = getRandomInt(1, Math.floor(this.canvas.width / brick.width) + 1) * brick.width - brick.width;
            const y = getRandomInt(1, Math.floor((this.canvas.height / brick.height) * .6)) * brick.height - brick.height;
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
