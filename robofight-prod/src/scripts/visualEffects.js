import { energyCounter } from './energyCounter'
import { soundFX } from './sound'

function visualBlizzard() {
    soundFX(1);
    energyCounter(20);
    var display = document.getElementById('visualCanvas');
    display.style.display = 'block';

    var counter = 0;
    var DAMPING = 0.999;
    function Particle(x, y) {
        this.x = this.oldX = x;
        this.y = this.oldY = y;
    }
    Particle.prototype.integrate = function () {
        var velocityX = (this.x - this.oldX) * DAMPING;
        var velocityY = (this.y - this.oldY) * DAMPING;
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += velocityX;
        this.y += velocityY;
    };
    Particle.prototype.attract = function (x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        this.x += dx / distance;
        this.y += dy / distance;
    };
    Particle.prototype.draw = function () {
        ctx.strokeStyle = (Math.floor(Math.random() * (2 - 0))) ? '#64d4d4' : '#ffffff';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(this.oldX, this.oldY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    };
    var ctx = display.getContext('2d');
    var particles = [];
    var width = display.width = window.innerWidth;
    var height = display.height = window.innerHeight;
    var mouse = { x: width * 0.5, y: height * 0.5 - 5 };
    for (var i = 0; i < 200; i++) {
        particles[i] = new Particle(Math.random() * width, Math.random() * height);
    }

    requestAnimationFrame(frame);
    function frame() {
        counter++;
        if (counter < 400) {
            requestAnimationFrame(frame);
            ctx.clearRect(0, 0, width, height);
            for (var i = 0; i < particles.length; i++) {
                particles[i].attract(mouse.x, mouse.y);
                particles[i].integrate();
                particles[i].draw();
            }
        }
        else {
            ctx.clearRect(0, 0, width, height);
            display.style.display = 'none'
        }
    }
}

function visualBurner() {
    soundFX(2);
    energyCounter(20);

    var c = document.getElementById('visualCanvas'),
        ctx = c.getContext('2d'),
        cw = c.width = 600,
        ch = c.height = 600,
        parts = [],
        partCount = 90,
        partsFull = false,
        hueRange = 100,
        globalTick = 0,
        rand = function (min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        };

    c.style.display = 'block';
    c.style.opacity = 0.7;

    var Part = function () {
        this.reset();
    };

    Part.prototype.reset = function () {
        this.startRadius = rand(1, 160);
        this.radius = this.startRadius;
        this.x = cw / 2 + (rand(0, 6) - 3);
        this.y = 300;
        this.vx = 0;
        this.vy = 0;
        this.hue = rand(globalTick - hueRange, globalTick + hueRange);
        this.saturation = rand(50, 100);
        this.lightness = rand(20, 70);
        this.startAlpha = rand(1, 10) / 100;
        this.alpha = this.startAlpha;
        this.decayRate = .1;
        this.startLife = 7;
        this.life = this.startLife;
        this.lineWidth = rand(1, 3);
    }

    Part.prototype.update = function () {
        this.vx += (rand(0, 200) - 100) / 1500;
        this.vy -= this.life / 50;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha = this.startAlpha * (this.life / this.startLife);
        this.radius = this.startRadius * (this.life / this.startLife);
        this.life -= this.decayRate;
        if (
            this.x > cw + this.radius ||
            this.x < -this.radius ||
            this.y > ch + this.radius ||
            this.y < -this.radius ||
            this.life <= this.decayRate
        ) {
            this.reset();
        }
    };

    Part.prototype.render = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = ctx.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
        ctx.lineWidth = this.lineWidth;
        ctx.fill();
        ctx.stroke();
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
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'hsla(0, 0%, 0%, .3)';
        ctx.fillRect(0, 0, cw, ch);
        ctx.globalCompositeOperation = 'lighter';
    };

    var loop = function () {
        if (globalTick > 120 && globalTick < 200) {
            c.style.opacity = (200 - globalTick) / 100;
        }

        if (globalTick > 200) {
            c.style.display = 'none';
            c.style.opacity = 1;
            clear();
        }
        else {
            window.requestAnimFrame(loop, c);
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

export { visualBlizzard, visualBurner}