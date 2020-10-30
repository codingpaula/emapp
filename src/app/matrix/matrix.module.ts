import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MatrixComponent } from './matrix.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopicComponent } from './topic/topic.component';
import * as fromMatrix from './matrix.reducers';

@NgModule({
  imports: [StoreModule.forFeature('matrix', fromMatrix.reducer)],
  declarations: [MatrixComponent, SidebarComponent, TopicComponent],
})
export class MatrixModule {}
