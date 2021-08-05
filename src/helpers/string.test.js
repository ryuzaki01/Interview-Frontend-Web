import {
  maskPhone,
  maskEmail
} from './string';

describe('maskPhone()', () => {
  describe.each([
    ['0812345678912', '****-****-**912'],
    ['081234567891', '****-****-*891'],
    ['08123456789', '****-****-789'],
    ['62812345678912', '****-****-***912'],
    ['6281234567891', '****-****-**891'],
    ['628123456789', '****-****-*789'],
    ['', ''],
    [null, ''],
    [undefined, ''],
  ])('When input %s', (input, expected) => {
    test(`Then output: ${expected}`, () => {
      expect(maskPhone(input)).toBe(expected);
    });
  });
    
});

describe('maskEmail()', () => {
  describe.each([
    ['user@test.com', 'us**@test.com'],
    ['username@test.com', 'user****@test.com'],
    ['us@test.com', 'u*@test.com'],
    ['usernameodd@test.com', 'usern******@test.com'],
    ['@test.com', ''],
    ['', ''],
    [null, ''],
    [undefined, ''],
  ])('When input %s', (input, expected) => {
    test(`Then output: ${expected}`, () => {
      expect(maskEmail(input)).toBe(expected);
    });
  });
    
});
