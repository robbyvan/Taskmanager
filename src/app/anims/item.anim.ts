import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

export const itemAnim = trigger('item', [
  state('in', style({ 'border-left-width': '8px' })),
  state('out', style({ 'border-left-width': '3px' })),
  transition('in => out', animate('100ms ease-out')),
  transition('out => in', animate('100ms ease-in')),
]);