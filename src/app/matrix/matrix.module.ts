import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatrixComponent } from './matrix.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopicButtonComponent } from './topic-button/topic-button.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [MatrixComponent, SidebarComponent, TopicButtonComponent],
})
export class MatrixModule {}
