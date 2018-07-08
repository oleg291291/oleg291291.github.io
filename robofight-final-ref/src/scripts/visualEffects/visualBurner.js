import getRandomInt from '../getRandomInt'

export default function visualBurner() {

    var visualCanvas = document.getElementById('visualCanvas'),
        visualContext = visualCanvas.getContext('2d'),
        canvasWidth = visualCanvas.width = 600,
        canvasHight = visualCanvas.height = 600,
        parts = [],
        partCount = 90,
        partsFull = false,
        hueRange = 100,
        globalTick = 0;


    visualCanvas.style.display = 'block';
    visualCanvas.style.opacity = 0.7;

    var Part = function () {
        this.reset();
    };

    Part.prototype.reset = function () {
        this.startRadius = getRandomInt(1, 160);
        this.radius = this.startRadius;
        this.x = canvasWidth / 2 + (getRandomInt(0, 6) - 3);
        this.y = 300;
        this.vx = 0;
        this.vy = 0;
        this.hue = getRandomInt(globalTick - hueRange, globalTick + hueRange);
        this.saturation = getRandomInt(50, 100);
        this.lightness = getRandomInt(20, 70);
        this.startAlpha = getRandomInt(1, 10) / 100;
        this.alpha = this.startAlpha;
        this.decayRate = .1;
        this.startLife = 7;
        this.life = this.startLife;
        this.lineWidth = getRandomInt(1, 3);
    }

    Part.prototype.update = function () {
        this.vx += (getRandomInt(0, 200) - 100) / 1500;
        this.vy -= this.life / 50;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = this.startAlpha * (this.life / this.startLife);
        this.radius = this.startRadius * (this.life / this.startLife);
        this.life -= this.decayRate;
        if (
            this.x > canvasWidth + this.radius ||
            this.x < -this.radius ||
            this.y > canvasHight + this.radius ||
            this.y < -this.radius ||
            this.life <= this.decayRate
        ) {
            this.reset();
        }
    };

    Part.prototype.render = function () {
        visualContext.beginPath();
        visualContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        visualContext.fillStyle = visualContext.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
        visualContext.lineWidth = this.lineWidth;
        visualContext.fill();
        visualContext.stroke();
    };

    var createParts = function () {
        if (!partsFull) {
            if (parts.length > partCount) {
                partsFull = true;
            } else {
                parts.push(new Part());
            }
        }
    };

    var updateParts = function () {
        var i = parts.length;
        while (i--) {
            parts[i].update();
        }
    };

    var renderParts = function () {
        var i = parts.length;
        while (i--) {
            parts[i].render();
        }
    };

    var clear = function () {
        visualContext.globalCompositeOperation = 'destination-out';
        visualContext.fillStyle = 'hsla(0, 0%, 0%, .3)';
        visualContext.fillRect(0, 0, canvasWidth, canvasHight);
        visualContext.globalCompositeOperation = 'lighter';
    };

    var loop = function () {
        if (globalTick > 120 && globalTick < 200) {
            visualCanvas.style.opacity = (200 - globalTick) / 100;
        }

        if (globalTick > 200) {
            visualCanvas.style.display = 'none';
            visualCanvas.style.opacity = 1;
            clear();
        }
        else {
            window.requestAnimFrame(loop, visualCanvas);
            clear();
            createParts();
            updateParts();
            renderParts();
            globalTick++;
        }
    };

    window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1E3 / 60) } }();

    loop();
}
