import { PasswordChecker, PasswordErrors } from './../src/passwordChecker';

describe('Password checker test suite', () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('password less than 8 characters is invalid', () => {
    const actual = sut.checkPassword('1234567');
    expect(actual).toStrictEqual({
      valid: false,
      reasons: expect.arrayContaining([PasswordErrors.SHORT]),
    });
  });
  it('password more than 8 characters is valid', () => {
    const actual = sut.checkPassword('123456789');
    expect(actual).toStrictEqual({
      valid: false,
      reasons: expect.not.arrayContaining([PasswordErrors.SHORT]),
    });
  });
  it('password without a uppercase character is invalid', () => {
    const actual = sut.checkPassword('1234567abcd');
    expect(actual).toStrictEqual({
      valid: false,
      reasons: expect.arrayContaining([PasswordErrors.NO_UPPER_CASE]),
    });
  });
  it('password with an uppercase character is valid', () => {
    const actual = sut.checkPassword('Aa');
    expect(actual).toStrictEqual({
      valid: false,
      reasons: expect.not.arrayContaining([PasswordErrors.NO_UPPER_CASE]),
    });
  });
  it('password without a lowercase character is invalid', () => {
    const actual = sut.checkPassword('1ABCD');
    expect(actual).toStrictEqual({
      valid: false,
      reasons: expect.arrayContaining([PasswordErrors.NO_LOWER_CASE]),
    });
  });
  it('password with an lowercase character is valid', () => {
    const actual = sut.checkPassword('1234567a');
    expect(actual).toStrictEqual({
      valid: false,
      reasons: expect.not.arrayContaining([PasswordErrors.NO_LOWER_CASE]),
    });
  });

  it('complex password is valid', () => {
    const actual = sut.checkPassword('M&rcu$mar1973');
    expect(actual).toStrictEqual({
      valid: true,
      reasons: [],
    });
  });
});
