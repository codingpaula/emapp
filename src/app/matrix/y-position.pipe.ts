import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yPosition' })
export class YPositionPipe implements PipeTransform {
  // 100%, unten 5% Mindestabstand, 1% oben -> 94% übrig
  transform(yValue: number): string {
    return ((100 - yValue) / 100) * 94 + '%';
  }
}
