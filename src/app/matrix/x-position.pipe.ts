import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'xPosition' })
export class XPositionPipe implements PipeTransform {
  transform(xValue: Date, maxDate: Date): string {
    // | > maxDate ------------- < maxDate | <- today
    // | 100 --------------------------- 0 |
    // 100 = maxDate - today
    // 0 = today
    const today = new Date().getTime();
    const maxDateTime = maxDate.getTime();
    const value = xValue.getTime();
    let ratio: number;
    if (value < today) {
      ratio = 0;
    } else if (value > maxDateTime) {
      ratio = 1;
    } else {
      ratio = (value - today) / (maxDateTime - today);
    }

    console.log(ratio);

    ratio = Math.max(ratio, 0);
    ratio = Math.min(ratio, 1);

    console.log(ratio);
    return (1 - ratio) * 94 + '%';
  }
}
