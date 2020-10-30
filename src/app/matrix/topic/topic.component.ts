import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Topic } from '../matrix.interfaces';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input() topic: Topic;
}
