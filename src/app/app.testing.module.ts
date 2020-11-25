import { NgModule } from '@angular/core';
import { HeaderMockComponent } from './header/header.component.mock';
import { MatrixTestingModule } from './matrix/matrix.testing.module';

@NgModule({
  imports: [MatrixTestingModule],
  declarations: [HeaderMockComponent],
})
export class AppTestingModule {}
