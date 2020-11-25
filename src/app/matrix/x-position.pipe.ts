import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xPosition' })
export class XPositionPipe implements PipeTransform {
  transform(
    xDay: number,
    xMonth: number,
    xYear: number,
    maxDate: Date,
  ): string {
    // | > maxDate ------------- < maxDate | <- today
    // | 100 --------------------------- 0 |
    // 100 = maxDate - today
    // 0 = today
    const today = new Date().getTime();
    const maxDateTime = maxDate.getTime();
    const xValue = new Date(xYear + 2000, xMonth - 1, xDay);
    const value = xValue.getTime();
    let ratio: number;
    if (value < today) {
      ratio = 0;
    } else if (value > maxDateTime) {
      ratio = 1;
    } else {
      ratio = (value - today) / (maxDateTime - today);
    }

    ratio = Math.max(ratio, 0);
    ratio = Math.min(ratio, 1);

    return (1 - ratio) * 94 + 1 + '%';
  }
}
