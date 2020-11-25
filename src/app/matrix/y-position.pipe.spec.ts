import { YPositionPipe } from './y-position.pipe';

describe('YPositionPipe', () => {
  const pipe = new YPositionPipe();

  it('should return a % string', () => {
    const result = pipe.transform(10);
    expect(result.charAt(result.length - 1)).toBe('%');
  });

  it('should return 95 for a value 0', () => {
    expect(pipe.transform(0)).toBe('95%');
  });

  it('should return 1 for a value of 100', () => {
    expect(pipe.transform(100)).toBe('1%');
  });
});
