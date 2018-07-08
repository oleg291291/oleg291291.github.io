import { energyCounter } from '../energyCounter'

export default function visualHypnosisOnPlayer() {

    var canvas = document.getElementById('visualCanvas');

    let ctx, width = 500, height = width, time = 0;

    function setup() {
        canvas.style.display = 'block';
        canvas.style.animation = "3s rot linear 2";

        canvas.addEventListener("webkitAnimationEnd", function () {
            canvas.style.display = 'none';
            canvas.style.animation = "none";
        });

        canvas.style.alignSelf = "center";

        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        requestAnimationFrame(draw);
    }

    function draw() {

        let r, theta, x, y;
        time = (time + 0.6) % 360;
        for (r = width / 4; r > 1; r -= width / 4 * 0.1) {
            ctx.fillStyle = "hsla(" + (4 * 360 * r / width + time) + ", 50%, 50%, 0.4)";
            ctx.beginPath();
            for (theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / 80) {
                x = (r * (1 + 0.1 * theta)) * Math.cos(theta);
                y = (r * (1 + 0.1 * theta)) * Math.sin(theta);
                ctx.lineTo(x + parseInt(width / 2), y + parseInt(height / 2));
            }
            ctx.fill();
        }

        if (canvas.style.display === 'block') {
            requestAnimationFrame(draw);
        }
    }
    setup();
};
