import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasComponent } from './canvas/canvas.component';
import { MatrixComponent } from './matrix.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskDotComponent } from './task-dot/task-dot.component';
import { TopicButtonComponent } from './topic-button/topic-button.component';
import { XPositionPipe } from './x-position.pipe';
import { YPositionPipe } from './y-position.pipe';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [
    CanvasComponent,
    MatrixComponent,
    SidebarComponent,
    TaskDotComponent,
    TopicButtonComponent,
    XPositionPipe,
    YPositionPipe,
  ],
})
export class MatrixModule {}
