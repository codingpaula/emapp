import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixModule } from './matrix/matrix.module';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/app.reducers';
import { appEffects } from './store/app.effects';
import { CommonModule } from '@angular/common';

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
