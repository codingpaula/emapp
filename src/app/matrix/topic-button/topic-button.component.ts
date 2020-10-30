import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { Topic } from '../matrix.interfaces';

@Component({
  selector: 'app-topic-button',
  templateUrl: './topic-button.component.html',
  styleUrls: ['./topic-button.component.scss'],
})
export class TopicButtonComponent {
  @Input() topic: Topic;
  @Output() toggleVisibility = new EventEmitter<number>();

  toggleTopic(): void {
    this.toggleVisibility.emit(this.topic.id);
  }
}
