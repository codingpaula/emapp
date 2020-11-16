import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xPosition' })
export class XPositionPipe implements PipeTransform {
  transform(xValue: Date, maxDate: Date): string {
    // | > maxDate ------------- < maxDate | <- today
    const today = new Date().getTime();
    const maxDateTime = maxDate.getTime();
    const maxDiff = maxDateTime - today;
    const diff = maxDateTime - xValue.getTime();
    const ratio = diff / maxDiff;
    return ratio * 94 + '%';
  }
}
