import $ from 'jquery'
import { compile } from 'handlebars'
import template from '../html/taskComponent.handlebars'

export default (ctx, next) => {
    $('.task-component').html(compile(template)())
}