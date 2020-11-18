import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xPosition' })
export class XPositionMockPipe implements PipeTransform {
  transform(xValue: Date, maxDate: Date): string {
    return 'test';
  }
}
