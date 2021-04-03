import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CanvasComponent } from './canvas/canvas.component';
import { MatrixComponent } from './matrix.component';
import { MatrixEffects } from './matrix.effects';
import { DetailComponent } from './detail/detail.component';
import * as fromMatrix from './matrix.reducers';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskDotComponent } from './task-dot/task-dot.component';
import { TopicButtonComponent } from './topic-button/topic-button.component';
import { XPositionPipe } from './x-position.pipe';
import { YPositionPipe } from './y-position.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    EffectsModule.forFeature([MatrixEffects]),
    StoreModule.forFeature(
      fromMatrix.matrixFeatureKey,
      fromMatrix.matrixReducer,
    ),
    FontAwesomeModule,
  ],
  declarations: [
    CanvasComponent,
    DetailComponent,
    MatrixComponent,
    SidebarComponent,
    TaskCardComponent,
    TaskDotComponent,
    TopicButtonComponent,
    XPositionPipe,
    YPositionPipe,
  ],
})
export class MatrixModule {}
