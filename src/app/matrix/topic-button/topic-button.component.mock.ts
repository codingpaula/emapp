import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Topic } from '../matrix.interfaces';

@Component({
  selector: 'app-topic-button',
  template: '<div>TopicButtonMockComponent</div>',
})
export class TopicButtonMockComponent {
  @Input() topic?: Topic;
  @Output() toggleVisibility = new EventEmitter<number>();
}
