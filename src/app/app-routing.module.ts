import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatrixComponent } from './matrix/matrix.component';

const routes: Routes = [
  {
    path: '',
    component: MatrixComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
