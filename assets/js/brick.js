'use strict';

class Brick {
    canvas;
    ctx;
    canCollide = true;
    x = 0;
    y = 0;
    width = 40;
    height = 20;
    gap = 0;
    life = 1;
    score = 5;
    color = 'white';
    hitbox;

    scoreDelegate = amount => {};

    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.x = this.canvas.width;
        this.color = getRandomColor();
    }

    update = () => {
        this.x -= 5;
    }

    draw = () => {
        this.hitbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            fillStyle: this.color
        };
        fillRect(this.ctx, this.hitbox);
    };

    testCollision = other => {
        if (!this.hitbox) {
            return false;
        }

        const hit = other.x - this.x + (other.radius * 2) > 0 && Math.abs(other.x - (other.radius * 2) - this.x) < this.width
                 && other.y - this.y + (other.radius * 2) > 0 && Math.abs(other.y - (other.radius * 2) - this.y) < this.height

        if (hit) {
            return this.hitDirection(other);
        }
        return false;
    };

    hitDirection = other => {
        const otherCenterX = other.x + other.radius;
        const otherCenterY = other.y + other.radius;

        const leftTest = Math.abs(this.x - otherCenterX);
        const rightTest = Math.abs((this.x + this.width) - otherCenterX);

        const topTest = Math.abs(this.y - otherCenterY);
        const bottomTest = Math.abs((this.y + this.height) - otherCenterY);

        const smallest = Math.min(...[leftTest, rightTest, topTest, bottomTest]);

debugger;

        if (smallest === rightTest) {
            return 'RIGHT';
        }
        if (smallest === leftTest) {
            return 'LEFT';
        }
        if (smallest === topTest) {
            return 'TOP';
        }
        if (smallest === bottomTest) {
            return 'BOTTOM';
        }
        return 'UNKNOWN';
    };

    didCollide = (event, direction) => {
        if (direction === 'LEFT' || direction === 'RIGHT') {
            event.vx = event.vx * -1;
        } else if(direction === 'TOP' || direction === 'BOTTOM') {
            event.vy = event.vy * -1;
        }
        this.life--;
        this.scoreDelegate(this.score);
    };
}
