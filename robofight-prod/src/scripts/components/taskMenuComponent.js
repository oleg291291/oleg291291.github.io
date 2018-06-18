import $ from 'jquery'
import { compile } from 'handlebars'
import template from '../../html/taskMenuComponent.handlebars'

export default (ctx, next) => {
    $('.task-component').html(compile(template)())
}