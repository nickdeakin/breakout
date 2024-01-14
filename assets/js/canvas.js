let canvas;
let ctx;
let game;

const init = async () => {
    createCanvas();
    game = new Game(ctx, canvas);
    await game.start();
};

const createCanvas = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
};

init();