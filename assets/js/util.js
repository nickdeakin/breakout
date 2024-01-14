/**
 * 
 * Global functions
 * 
 */

const radian = Math.PI / 180;

const KEY_CODE = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    R: 82
};

// Randomizers
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    return Math.floor(
        Math.random() * (Math.ceil(max) - min)
    ) + min;
};

const getRandomColor = () => {
    const r = getRandomInt(0, 257);
    const g = getRandomInt(0, 257);
    const b = getRandomInt(0, 257);
    return `rgba(${r}, ${g}, ${b}, 1)`;
};

// Text
const drawText = (ctx, params, text) => {
    ctx.font = params.font;
    ctx.fillStyle = params.fillStyle;
    const extraX = params.extraX ?? 0;
    const extraY = params.extraY ?? 0;
    const x = (params.centered ? this.canvas.width / 2 : params.x) + extraX;
    const y = (params.centered ? this.canvas.height / 2 : params.y) + extraY;
    const maxWidth = params.centered ? this.canvas.width : params.maxWidth;
    
    ctx.textAlign = params.centered ? 'center' : params.textAlign ?? 'normal';
    ctx.textBaseline = params.centered ? 'middle' : params.textBaseline ?? 'normal';
    if (params.textType === 'stroke') {
        ctx.strokeText(text, x, y, maxWidth);
    } else {
        ctx.fillText(text, x, y, maxWidth);
    }
}

// Drawing
const fillRect = (ctx, params) => {
    ctx.fillStyle = params.fillStyle;
    if (params.fullscreen) {
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
        ctx.fillRect(params.x, params.y, params.width, params.height);
    }
};

// Images
const loadImage = async (filename) => {
    return new Promise(resolve => {
        image = new Image();
        image.src = filename;
        image.onload = () => {
            resolve(image);
        };
    });
};

const drawImage = (options, image) => {
    ctx.drawImage(image,
    options.dx, options.dy, options.dw, options.dh);
}

const drawImageFromSprite = (options, image) => {
    ctx.drawImage(image,
    options.sx, options.sy, options.sw, options.sh,
    options.dx, options.dy, options.dw, options.dh);
}

// Animation mechanics
requestAnimationFrame = (() => {
    const patch = callback => {
        setTimeout(callback, 1000 / 60);
    }
    return  window.requestAnimationFrame        ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.msRequestAnimationFrame      ||
            patch
})();