//This component renders modal window for a game tasks menu.
import './modalTaskMenu.sass';

import $ from 'jquery';
import { compile } from 'handlebars'

import modalTaskMenuTemplate from './modalTaskMenu.handlebars'


export default ()=>{
    $('.task-component').html(compile(modalTaskMenuTemplate)());
}