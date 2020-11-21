import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatrixModule } from './matrix/matrix.module';
import { SharedModule } from './shared/shared.module';
import { appEffects } from './store/app.effects';
import { appReducers } from './store/app.reducers';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    MatrixModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    EffectsModule.forRoot(appEffects),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
