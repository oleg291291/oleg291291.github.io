//This component renders loader before landing page.
import './loading.sass';

import $ from 'jquery';
import { compile } from 'handlebars'

import loadingTemplate from './loading.handlebars'


export default () => {
    $('.landing-page-container').addClass('landing-page-container__on-loading')
    $('.loading-component').html(compile(loadingTemplate)());
    
    $(window).on('load', () => {
        $('.loading-component').remove();
        $('.landing-page-container').removeClass('landing-page-container__on-loading');
        $('a.start-button').focus();
    })
}