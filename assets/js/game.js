'use strict';

class Game {
    static INITIAL = 1;
    static GAME_PLAYING = 2;
    static GAME_OVER = 3;

    // Base
    ctx;
    canvas;

    // Game state
    currentState = Game.INITIAL;

    // Game speed
    velocity = -5;

    textParams = {
        textType: 'fill',
        font: '36px Verdana',
        fillStyle: 'white',
        centered: true
    };

    backgroundParams = {
        fillStyle: 'rgba(0,0,0,0.7)',
        fullscreen: true
    }

    background;
    score;
    brickFactory;
    ball;
    paddle;

    gameObjects = [];
    mouseDelegates = [];

    constructor(context, canvas) {
        this.ctx = context;
        this.canvas = canvas;
    }

    start = async () => {
        // Start game
        this.currentState = Game.INITIAL;
        this.runLoop();
        this.bindEvents();
    };

    startNewGame = async () => {        
        await this.createGameObjects();
        
        this.score.reset();
        //this.brickFactory.generateRandomBricks();

        this.brickFactory.setLevelBricks(this.testBricks);

        this.currentState = Game.GAME_PLAYING;
    };

    bindEvents = () => {
        // Mouse events
        this.canvas.addEventListener('click', this.click);
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('mousedown', this.mouseDown);
        this.canvas.addEventListener('mouseup', this.mouseUp);
        
        // Key events
        window.addEventListener('keydown', this.keyPress);
    }

    mouseMove = event => {
        this.mouseDelegates.forEach(x => x.mouseMove && x.mouseMove(event));
    }

    mouseDown = event => {
        this.mouseDelegates.forEach(x => x.mouseDown && x.mouseDown(event));
    }

    mouseUp = event => {
        this.mouseDelegates.forEach(x => x.mouseUp && x.mouseUp(event));
    }

    click = event => {
        switch (this.currentState) {
            case Game.INITIAL:
                this.startNewGame();
                break;
            case Game.GAME_PLAYING:
                this.launchBall();
                break;
            case Game.GAME_OVER:
                break;
            default:
        }
    }

    keyPress = event => {
        switch (this.currentState) {
            case Game.INITIAL:
                break;
            case Game.GAME_PLAYING:
                break;
            case Game.GAME_OVER:
                switch (event.keyCode) {
                    case KEY_CODE.R:
                        this.currentState = Game.INITIAL
                        break;
                }
                break;
            default:
        }

    }

    runLoop = () => {
        requestAnimationFrame(this.runGameLoop);
    }

    deadDelegate = dead => {
        this.score.deductLife();
        if (this.score.lives < 1) {
            this.currentState = Game.GAME_OVER
        } else {
            this.restart();
        }
    }

    scoreDelegate = amount => {
        this.score.addScore(amount);
    }

    runGameLoop = () => {
        // Game state
        switch (this.currentState) {
            case Game.INITIAL:
                // Draw initial screen
                this.drawInitialScreen();
                break;
            case Game.GAME_PLAYING:
                // Draw game playing screen
                this.drawPlayingScreen();
                break;
            case Game.GAME_OVER:
                // Draw game over screen
                this.drawGameOverScreen();
                break;
            default:
        }
        this.runLoop();
    };

    launchBall = () => {
        if (!this.ball.isLaunched) {
            this.ball.launch();
        }
    };

    // Refactor
    createGameObjects = async () => {
        this.mouseDelegates = [];
        this.gameObjects = [];

        this.background = new GameBackground(this.ctx, this.canvas, 'rgba(20, 20, 20, 1)');
        this.score = new GameScore(this.ctx, this.canvas);
        this.brickFactory = new BrickFactory(this.ctx, this.canvas);
        this.brickFactory.scoreDelegate = this.scoreDelegate;

        this.gameObjects.push(this.background);
        this.gameObjects.push(this.brickFactory);
        this.gameObjects.push(this.score);

        this.ball = new Ball(this.ctx, this.canvas, 5, 'rgba(240, 240, 240, 1)', false);
        this.ball.deadDelegate = this.deadDelegate;

        /*
        this.ball.x = (this.canvas.width / 2) - (this.ball.radius / 2);
        this.ball.y = 450;
        this.ball.vy = -5;
        this.ball.vx = 0;

        this.ball.x = 200;
        this.ball.y = 400;
        this.ball.vy = 1;
        this.ball.vx = 1;
        */

        this.gameObjects.push(this.ball);

        this.paddle = new Paddle(this.ctx, this.canvas);
        this.mouseDelegates.push(this.paddle);
        this.gameObjects.push(this.paddle);
        this.paddle.ball = this.ball;
        this.restart();
    };

    restart = () => {
        this.ball.isLaunched = false;
        this.ball.vx = 0;
        this.ball.vy = 0;
        this.paddle.setBallPositionOnPaddle();
    };

    detectCollisions = () => {
        this.gameObjects.forEach(x => {
            this.gameObjects.forEach(y => {
                if (y !== x && y.canCollide && x.canCollide) {
                    if (x.testCollision && x.testCollision(y)) {
                        if (x.didCollide) {
                            x.didCollide(y);
                        }
                    }
                }
            });
        });
    };

    applyCollisions = () => {
        this.gameObjects.forEach(x => {
            if (x.applyCollision) {
                x.applyCollision();
            }
        });
    };

    update = () => {
        this.gameObjects.forEach(x => {
            x.update();
        });
    };

    clearScreen = () => {
        this.ctx.clearRect(0, 0 ,canvas.width, canvas.height);
    };

    drawInitialScreen = () => {
        this.clearScreen();
        fillRect(this.ctx, this.backgroundParams);
        drawText(this.ctx, this.textParams, '... Click to start ...');
    };

    drawPlayingScreen = () => {
        this.detectCollisions();
        this.applyCollisions();
        this.update();
        this.clearScreen();
        this.gameObjects.forEach(x => {
            x.draw();
        });
    };

    drawGameOverScreen = () => {
        this.clearScreen();
        fillRect(this.ctx, this.backgroundParams);
        
        this.score.draw();
        drawText(this.ctx, { ...this.textParams, ...{ extraY: -32 } }, '... Game over ...');
        drawText(this.ctx, { ...this.textParams, ...{ extraY: 32 } }, 'Press R to reload');
    };

    testBricks = [
        {x: 50, y: 40},
        {x: 50, y: 80},
        {x: 50, y: 120},
        {x: 50, y: 160},
        
        {x: 100, y: 40},
        {x: 100, y: 80, lives: 3},
        {x: 100, y: 120},
        {x: 100, y: 160},
        
        {x: 150, y: 40},
        {x: 150, y: 80},
        {x: 150, y: 120},
        {x: 150, y: 160}
    ];
}
