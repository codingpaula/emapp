import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatrixModule } from './matrix/matrix.module';
import { appEffects } from './store/app.effects';
import { appReducers } from './store/app.reducers';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    MatrixModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    EffectsModule.forRoot(appEffects),
    StoreModule.forRoot(appReducers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
