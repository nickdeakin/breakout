let canvas;
let ctx;
let game;

const init = async () => {
    createCanvas();
    game = new Game(ctx, canvas);
    await game.start();
};

const createCanvas = () => {
    const body = document.getElementsByTagName('body')[0];
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', window.innerWidth - 2);
    canvas.setAttribute('height', window.innerHeight - 2);
    body.appendChild(canvas);
    ctx = canvas.getContext('2d');
};

init();