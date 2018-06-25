import $ from 'jquery'
import { compile } from 'handlebars'
import template from './html/game.handlebars'

export default (ctx, next) => {
    $('#app').html(compile(template)())
}

