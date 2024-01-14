'use strict';

class Ball {
    canvas;
    ctx;
    canCollide = true;

    x = 400;
    y = 600;
    radius = 30;
    color = 'orange';

    vx = 0;
    vy = 0;
    ax = 0.00;
    ay = 0.00;
    gravity = 0;
    drag = 0;
    mass = 1;
    directionX = 1;
    directionY = 1;
    boundLeft = 0;
    boundRight = 0;
    boundTop = 0;
    boundBottom = 0;
    moveable = true;
    deadDelegate = dead => {};

    collisionHorizontalChange = 0;
    collisionVerticalChange = 0;

    constructor(context, canvas, radius, color, randomize) {
        this.color = color === null ? getRandomColor() : color;
        this.ctx = context;
        this.canvas = canvas;
        this.radius = radius === null ? getRandomInt(25, 50) : radius;
        this.mass = Math.ceil(this.radius / 10);
        this.updateBounds();

        if (randomize) {
            this.randomize();
        }
    }

    randomize = () => {
        this.x = getRandomInt(this.radius, this.canvas.width - this.radius);
        this.y = getRandomInt(this.radius, this.canvas.height - this.radius);
        this.updateBounds();
    }

    draw = () => {
        this.drawBall(this.x, this.y, this.radius, this.color);
    };
    
    update = () => {
        this.applyAcceleration();
        //this.applyGravity();
        //this.applyDrag();    
        this.edgeCollision();
        this.move();
        this.updateBounds();
    };

    drag = event => {
        this.x = event.x;
        this.y = event.y;
    };

    testCollision = other => {
        return Math.abs(this.x - other.x) < this.radius + other.width
            && Math.abs(this.y - other.y) < this.radius;
    };

    didCollide = event => {
        this.hasCollision = true;
        this.calculateCollision(event);
    };

    calculateCollision = event => {
        this.collisionVerticalChange = this.vy * -1
        this.collisionHorizontalChange = (this.x - (this.radius / 2) - event.x - (event.width / 2)) / 10;
    }

    applyCollision = () => {
        if (this.hasCollision) {
            this.vx = this.collisionHorizontalChange;
            this.vy = this.collisionVerticalChange;
            this.collisionHorizontalChange = 0;
            this.collisionVerticalChange = 0;
            this.hasCollision = false;
        }
    }

    applyAcceleration = () => {
        if (this.vx > 0 || this.vx < 0) {
            this.vx += this.ax;
        }
        if (this.vy > 0 || this.vy < 0) {
            this.vy += this.ay;
        }
    };

    applyGravity = () => {
        this.vy += this.gravity;
    };

    applyDrag = () => {
        if (this.vx < 0) {
            this.vx += this.drag;
        } else if (this.vx > 0) {
            this.vx -= this.drag;
        } else if (this.vx < this.drag && this.vx > -this.drag) {
            this.vx = 0;
        }
    };

    edgeCollision = () => {
        if (this.boundRight > this.canvas.width || this.boundLeft < 0) {
            this.vx *= -1;
        }
        if (this.boundBottom - this.radius < 0) {
            this.vy *= -1;
        }
        
        if (this.boundBottom > this.canvas.height) {
           this.deadDelegate(true);
        }
    };
    
    move = () => {
        this.x += this.vx;
        this.y += this.vy;
    }

    updateBounds = () => {
        this.boundRight = this.x + this.radius;
        this.boundLeft = this.x - this.radius;
        this.boundTop = this.y + this.radius;
        this.boundBottom = this.y - this.radius;
    }
    
    drawBall = (x, y, radius, color) => {
        const options = {
            strokeStyle: color,
            lineJoin: 'round',
            lineWidth: 2,
            fillStyle: color
        };
    
        this.drawArc(options, x, y, radius);
    };
    
    drawArc = (options, x, y, radius) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = options.strokeStyle;
        this.ctx.lineWidth = options.lineWidth;
        this.ctx.fillStyle = options.fillStyle;
    
        this.ctx.arc(x, y, radius, 0, 360 * radian, false);
        this.ctx.stroke();
        this.ctx.fill();
    }
}