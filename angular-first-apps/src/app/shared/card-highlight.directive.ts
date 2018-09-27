import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[cardHighlight]'
})
export class CardHighlightDirective {

    constructor(private element: ElementRef) { }
    @Input('cardHighlight') cardHighlightColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        this.cardHighlight(this.cardHighlightColor);
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.cardHighlight(null);
    }

    private cardHighlight(color) {
        this.element.nativeElement.style.backgroundColor = color;
    }
}