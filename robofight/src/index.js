import './styles/main.css';
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

const router = new Navigo();

router
    .on('/', HomePage)

    .on('/game', () => {

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


