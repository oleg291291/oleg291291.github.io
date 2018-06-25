import './styles/normalize.css';
import './styles/theme.sass';

import $ from 'jquery';

import Navigo from 'navigo';

import HomePage from './home.js';
import GamePage from './game.js';

import TaskMenuComponent from './components/taskMenuComponent.js';
import TaskComponent from './components/taskComponent.js';

import nameGenerator from './scripts/nameGenerator';
import runTask from './scripts/runTask';
import { canvasScript } from './scripts/canvasScript';
import { scoreCounter } from './scripts/score';

import headPart from './sprites/heads.png'
import bodyPart from './sprites/bodies.png'
import footsPart from './sprites/foots.png'
import armsPart from './sprites/arms.png'

var enemyHead = new Image();
enemyHead.src = headPart;
var enemyBody = new Image();
enemyBody.src = bodyPart;
var enemyFoots = new Image();
enemyFoots.src = footsPart;
var enemyRightArm = new Image();
enemyRightArm.src = armsPart;
var enemyLeftArm = new Image();
enemyLeftArm.src = armsPart;


var isProd = typeof process.env.NODE_ENV === 'undefined';
// For usable links in production need to set root and hash, and send it to new Navigo as params.
var root = (isProd) ? location.href : null;
var useHash = true;
var hash = '#';

var router = new Navigo(root, useHash, hash);

router
    .on(HomePage)

    .on('game', () => {

        GamePage();
        nameGenerator();

        canvasScript(enemyHead, enemyBody, enemyFoots, enemyLeftArm, enemyRightArm);
        scoreCounter();

        $('button.spell-choose-button').on('click', () => {
            TaskMenuComponent();
            $('button.spell-menu__spell-button').on('click', TaskComponent);
            $('button.spell-menu__spell-button').on('click', runTask);
        });

        $('.win__next-button').on('click', () => { $('.win-container').css("zIndex", -10) })

    }
    )

    .resolve();

$(window).on('load', () => {
    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault();
        const href = $(e.target).attr('href');
        router.navigate(href);
    })
})


