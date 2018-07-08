
import { energyCounter } from '../energyCounter'
// import { soundFX } from '../sound'

export default function visualHypnosisOnPlayer() {

    var canvas = document.getElementById('visualCanvas');

    // soundFX('soundHypnosis');
    // energyCounter(20, 'player')

    let ctx, w = 500, h = w, t = 0;

    function setup() {
        canvas.style.display = 'block';
        canvas.style.animation = "3s rot linear 2";

        canvas.addEventListener("webkitAnimationEnd", function () {
            canvas.style.display = 'none';
            canvas.style.animation = "none";
        });

        canvas.style.alignSelf = "center";

        canvas.width = w;
        canvas.height = h;
        ctx = canvas.getContext('2d');

        requestAnimationFrame(draw);
    }

    function draw() {

        let r, theta, x, y;
        t = (t + 0.6) % 360;
        for (r = w / 4; r > 1; r -= w / 4 * 0.1) {
            ctx.fillStyle = "hsla(" + (4 * 360 * r / w + t) + ", 50%, 50%, 0.4)";
            ctx.beginPath();
            for (theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / 80) {
                x = (r * (1 + 0.1 * theta)) * Math.cos(theta);
                y = (r * (1 + 0.1 * theta)) * Math.sin(theta);
                ctx.lineTo(x + parseInt(w / 2), y + parseInt(h / 2));
            }
            ctx.fill();
        }

        if (canvas.style.display === 'block') {
            requestAnimationFrame(draw);
        }
    }
    setup();
};
