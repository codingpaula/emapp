import { NgModule } from '@angular/core';
import { CanvasMockComponent } from './canvas/canvas.component.mock';
import { DetailMockComponent } from './detail/detail.component.mock';
import { SidebarMockComponent } from './sidebar/sidebar.component.mock';
import { TaskCardMockComponent } from './task-card/task-card.component.mock';
import { TaskDotMockComponent } from './task-dot/task-dot.component.mock';
import { TopicButtonMockComponent } from './topic-button/topic-button.component.mock';
import { XPositionMockPipe } from './x-position.pipe.mock';
import { YPositionMockPipe } from './y-position.pipe.mock';

@NgModule({
  declarations: [
    CanvasMockComponent,
    DetailMockComponent,
    SidebarMockComponent,
    TaskCardMockComponent,
    TaskDotMockComponent,
    TopicButtonMockComponent,
    XPositionMockPipe,
    YPositionMockPipe,
  ],
  exports: [
    CanvasMockComponent,
    DetailMockComponent,
    SidebarMockComponent,
    TaskCardMockComponent,
    TaskDotMockComponent,
    TopicButtonMockComponent,
    XPositionMockPipe,
    YPositionMockPipe,
  ],
})
export class MatrixTestingModule {}
