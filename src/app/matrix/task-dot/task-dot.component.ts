import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, Topic } from '../matrix.interfaces';

@Component({
  selector: 'app-task-dot',
  templateUrl: './task-dot.component.html',
  styleUrls: ['./task-dot.component.scss'],
})
export class TaskDotComponent {
  @Input() task?: Task;
  @Input() topic?: Topic;
  @Output() selectTask = new EventEmitter<Task>();

  onClickTask(): void {
    if (this.task) {
      this.selectTask.emit(this.task);
    }
  }
}
