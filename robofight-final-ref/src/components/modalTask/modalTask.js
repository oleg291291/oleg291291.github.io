//This component renders modal window for a game task.
import './modalTask.sass';

import $ from 'jquery';
import { compile } from 'handlebars'

import modalTaskTemplate from './modalTask.handlebars'


export default ()=>{
    $('.task-component').html(compile(modalTaskTemplate)());
}