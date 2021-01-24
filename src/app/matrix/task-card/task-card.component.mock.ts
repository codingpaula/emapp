import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TopicDictionary } from '../matrix.interfaces';

@Component({
  selector: 'app-task-card',
  template: '<div>TaskCardMockComponent</div>',
})
export class TaskCardMockComponent {
  @Input() task!: Task;
  @Input() color!: string;
  @Input() position = 0;
  @Output() changeTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleDoneTask = new EventEmitter<number>();
}
