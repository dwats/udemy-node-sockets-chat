const expect = require('expect');

const { isRealString } = require('./validation');

describe('validation.js', () => {
  describe('isRealString()', () => {
    it('should reject non-string values', () => {
      const intRes = isRealString(123);
      const objRes = isRealString({});
      const arrRes = isRealString([]);
      const boolRes = isRealString(true);
      expect(intRes).toBe(false);
      expect(objRes).toBe(false);
      expect(arrRes).toBe(false);
      expect(boolRes).toBe(false);
    });

    it('should reject string with only spaces', () => {
      const spaceRes = isRealString(' ');
      expect(spaceRes).toBe(false);
    });

    it('should allow string with non-space characters', () => {
      const strRes = isRealString('abc 123');
      const trimStrRes = isRealString(' abc 123 ');
      expect(strRes).toBe(true);
      expect(trimStrRes).toBe(true);
    });
  });
});
