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
    lives = 1;
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
            fillStyle: this.lifeColor()
        };

        fillRect(this.ctx, this.hitbox);
    };

    lifeColor = () => {
        switch (this.lives) {
            case 5:
                return 'blue'
                break;
            case 4:
                return 'red'
                break;
            case 3:
                return 'orange'
                break;
            case 2:
                return 'yellow'
                break;
            case 1:
                return 'white'
                break;
            default:
                return 'purple'
                break;
        }
    }

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

        const leftTest = other.vx < 0 ? 999 : Math.abs(this.x - (otherCenterX + (other.radius / 2)) );
        const rightTest = other.vx > 0 ? 999 : Math.abs((this.x + this.width) - other.x);

        const topTest = other.vy < 0 ? 999 :  Math.abs(this.y - (otherCenterY + (other.radius / 2)) );
        const bottomTest = other.vy > 0 ? 999 : Math.abs((this.y + this.height) - other.y);

        const smallest = Math.min(...[leftTest, rightTest, topTest, bottomTest]);

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
        this.lives--;
        this.scoreDelegate(this.score);
    };
}
