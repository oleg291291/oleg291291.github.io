
function soundFX(type) {

    var context = new (window.AudioContext || window.webkitAudioContext)();

    class Oscillator {
        constructor(context, pitch, type) {
            this.pitch = pitch || 110;
        }
        init() {
            this.now = context.currentTime;
            this.oscillator = context.createOscillator();
            this.oscillator.type = 'square';

            this.gainNode = context.createGain();
            this.gainNode.gain.value = 0.02;

            this.oscillator.connect(this.gainNode);
            this.gainNode.connect(context.destination);
        }
        play(predelay) {
            this.init();
            this.oscillator.frequency.value = this.pitch;
            this.oscillator.start(predelay);
        }
        stop(time) {
            this.oscillator.stop(this.now + (time || 0.5));
        }

    }

    var counter = 0;

    function seqEnemyAttack(freq) {
        for (let i = 0; i < 5; i++) {
            let osc = new Oscillator(context, freq);
            osc.play(0 + i / 5);
            osc.stop(0.1 + i / 5);
            freq *= 1.01;
        }
        counter++;
        if (counter > 5) {
            clearInterval(seq);
        }
    }

    function seqBlizzard(freq) {
        let osc = new Oscillator();
        osc.play(0);
        osc.stop(0.2 - (counter / 300));

        counter++

        if (counter / 300 > 1) {
            clearInterval(seq);
        }
    }

    function seqBurner(freq) {
        let osc = new Oscillator(context, freq);
        osc.play(0);
        osc.stop(0.4);
        var seqInner = setInterval(function () { osc.oscillator.frequency.value /= 1.333 }, 100);

        counter++;

        if (counter > 14) {
            clearInterval(seq);
            clearInterval(seqInner);
        }
    }

    switch (type) {
        case 0:
            var seq = setInterval(function () { seqEnemyAttack(110) }, 900);
            break;
        case 1:
            var seq = setInterval(function () { seqBlizzard(110) }, 100);
            break;
        case 2:
            var seq = setInterval(function () { seqBurner(110) }, 360);
            break;
    }
}

export { soundFX }