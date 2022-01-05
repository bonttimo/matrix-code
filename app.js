const app = document.querySelector(".app");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.background = "black";

let zoom = false;

app.append(canvas);

class Symbol {
    constructor(x, y, fontSize, height) {
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.height = height;
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

        context.fillText(this.text, this.x * this.fontSize + Math.random() * 8, this.y * this.fontSize);
        if (this.y * this.fontSize > this.height && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.fontSize = 16;
        this.columns = this.width / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.height);
        }
    }
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.columns = this.width / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(width, height);

zoomVal = 1;
function animation() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#0aff0a";

    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => symbol.draw(ctx));

    if (zoom) {
        ctx.setTransform(zoomVal, 0, 0, zoomVal, (-(zoomVal - 1) * canvas.width) / 2, (-(zoomVal - 1) * canvas.height) / 2);
        zoomVal += 0.01;
    } else zoomVal = 1;
}

let lastTime = 0,
    fps = 24,
    nextFrame = 1000 / fps,
    time = 0;

function update(timeStamp = 0) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (time > nextFrame) animation(), (time = 0);
    else time += deltaTime;
    requestAnimationFrame(update);
}
update();

window.addEventListener("resize", (e) => {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    effect.resize();
});

canvas.addEventListener("click", () => {
    zoom = !zoom;
    console.log(zoom);
});
