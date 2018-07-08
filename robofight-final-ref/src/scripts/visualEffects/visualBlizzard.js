export default function visualBlizzard() {

    var visualCanvas = document.getElementById('visualCanvas');
    visualCanvas.style.display = 'block';

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
        visualContext.strokeStyle = (Math.floor(Math.random() * (2 - 0))) ? '#64d4d4' : '#ffffff';
        visualContext.lineWidth = 5;
        visualContext.beginPath();
        visualContext.moveTo(this.oldX, this.oldY);
        visualContext.lineTo(this.x, this.y);
        visualContext.stroke();
    };
    var visualContext = visualCanvas.getContext('2d');
    var particles = [];
    var width = visualCanvas.width = window.innerWidth;
    var height = visualCanvas.height = window.innerHeight;
    var targetPoint = { x: width * 0.5, y: height * 0.5 - 5 };
    for (var i = 0; i < 200; i++) {
        particles[i] = new Particle(Math.random() * width, Math.random() * height);
    }

    requestAnimationFrame(frame);
    function frame() {
        counter++;
        if (counter < 400) {
            requestAnimationFrame(frame);
            visualContext.clearRect(0, 0, width, height);
            for (var i = 0; i < particles.length; i++) {
                particles[i].attract(targetPoint.x, targetPoint.y);
                particles[i].integrate();
                particles[i].draw();
            }
        }
        else {
            visualContext.clearRect(0, 0, width, height);
            visualCanvas.style.display = 'none'
        }
    }
}

