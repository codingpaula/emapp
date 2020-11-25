import { XPositionPipe } from './x-position.pipe';

describe('XPositionPipe', () => {
  const pipe = new XPositionPipe();
  let today: Date;
  let maxTenDays: Date;

  beforeEach(() => {
    const now = new Date();
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    maxTenDays = new Date(today.valueOf());
    maxTenDays = new Date(maxTenDays.setDate(maxTenDays.getDate() + 10));
  });

  it('should return a % string', () => {
    const result = pipe.transform(1, 1, 1, new Date());
    expect(result.charAt(result.length - 1)).toBe('%');
  });

  it('should return 1 for maxDate', () => {
    const result = pipe.transform(
      maxTenDays.getDate(),
      maxTenDays.getMonth() + 1, // getMonth returns monthIndex which is one less than actual month
      maxTenDays.getFullYear() - 2000,
      maxTenDays,
    );
    expect(result).toBe('1%');
  });

  it('should return 95 for today', () => {
    const result = pipe.transform(
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear() - 2000,
      maxTenDays,
    );
    expect(result).toBe('95%');
  });
});
