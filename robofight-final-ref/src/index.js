import './styles/normalize.css';
import './styles/theme.sass';

import $ from 'jquery';

import Navigo from 'navigo';

import { compile } from 'handlebars'
import homePageTemplate from './html/home.handlebars'
import gamePageTemplate from './html/game.handlebars'

import modalTaskMenuComponent from './components/modalTaskMenu/modalTaskMenu.js'
import modalTaskComponent from './components/modalTask/modalTask.js'
import loadingComponent from './components/loading/loading.js'

import nameGenerator from './scripts/nameGenerator';
import taskManager from './scripts/taskManager';
import canvasScript from './scripts/canvasScript';
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

var root = (isProd) ? location.href : null;
var useHash = true;
var hash = '#';

var router = new Navigo(root, useHash, hash);

var needToLoadResources = true;

router
    .on(() => {
        $('#app').html(compile(homePageTemplate)({}));

        if (needToLoadResources) {
            loadingComponent();
            needToLoadResources = false;
        }
    })
    .on('game', () => {

        $('#app').html(compile(gamePageTemplate)({}));

        nameGenerator();

        canvasScript(enemyHead, enemyBody, enemyFoots, enemyLeftArm, enemyRightArm);

        scoreCounter();

        $('button.spell-choose-button').focus();

        $('button.spell-choose-button').on('click', () => {

            modalTaskMenuComponent();

            $('button.spell-menu__spell-button').on('click', modalTaskComponent);

            $('button.spell-menu__spell-button').on('click', taskManager);
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


