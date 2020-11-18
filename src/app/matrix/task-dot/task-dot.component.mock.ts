import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, Topic } from '../matrix.interfaces';

@Component({
  selector: 'app-task-dot',
  template: '<div>TaskDotMockComponent</div>',
})
export class TaskDotMockComponent {
  @Input() task?: Task;
  @Input() topic?: Topic;
  @Output() selectTask = new EventEmitter<Task>();
}
