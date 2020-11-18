import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yPosition' })
export class YPositionMockPipe implements PipeTransform {
  transform(yValue: number): string {
    return 'test';
  }
}
