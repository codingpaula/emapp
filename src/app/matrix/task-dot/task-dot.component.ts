import { Component, Input } from '@angular/core';
import { Task } from '../matrix.interfaces';

@Component({
  selector: 'app-task-dot',
  templateUrl: './task-dot.component.html',
  styleUrls: ['./task-dot.component.scss'],
})
export class TaskDotComponent {
  @Input() task?: Task;
}
