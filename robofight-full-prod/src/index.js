import './styles/normalize.css';
import './styles/theme.sass';

import $ from 'jquery';
import 'bootstrap';
import Navigo from 'navigo';

import HomePage from './home.js';
import GamePage from './game.js';

import TaskMenuComponent from './scripts/components/taskMenuComponent.js';
import TaskComponent from './scripts/components/taskComponent.js';

import { nameGenerator } from './scripts/duelScript';
import { runTask } from './scripts/duelScript';
import { canvasScript } from './scripts/canvasScript';
import { scoreCounter } from './scripts/score';


var isProd = typeof process.env.NODE_ENV === 'undefined';

// For usable links in production need to set root and hash, and send it to new Navigo as params.
var root = isProd ? "https://oleg291291.github.io/robofight/" : null;
var useHash = true;
var hash = '#';

var router = new Navigo(root, useHash, hash);

router
    .on(HomePage)

    .on('game', () => {

        GamePage();
        nameGenerator();
        canvasScript();
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


