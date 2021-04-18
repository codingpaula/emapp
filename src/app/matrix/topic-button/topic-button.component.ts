import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Topic } from '../matrix.interfaces';

@Component({
  selector: 'app-topic-button',
  templateUrl: './topic-button.component.html',
  styleUrls: ['./topic-button.component.scss'],
})
export class TopicButtonComponent {
  @Input() topic!: Topic;
  @Output() toggleVisibility = new EventEmitter<number>();
  editHover = false;
  nameHover = false;
  plusHover = false;
  faPencilAlt = faPencilAlt;
  faPlus = faPlus;

  editTopic(): void {
    console.log('pressed edit topic');
  }

  toggleTopic(): void {
    if (this.topic) {
      this.toggleVisibility.emit(this.topic.id);
    }
  }

  addTask(): void {
    console.log('pressed plus task');
  }
}
