import { type TestContext } from 'vitest';

import { getStringInfo, StringUtils, toUpperCase } from '../src/utils';

interface IContext extends TestContext {
  input: string;
}

describe('Utils test Suit', () => {
  describe('String Utils Test', () => {
    let sut: StringUtils;
    beforeEach(() => {
      sut = new StringUtils();
    });
    it('should return correct uppercase', () => {
      const actual = sut.toUpperCase('My-String');
      expect(actual).toBe('MY-STRING');
    });
    it('should throw an error on invalid argument arrow function', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function expectedError() {
        sut.toUpperCase();
      }
      expect(() => sut.toUpperCase()).toThrow();
      expect(() => sut.toUpperCase()).toThrowError('Invalid Argument!');
    });

    it('should throw an error on invalid argument try catch block', () =>
      new Promise((done) => {
        {
          try {
            sut.toUpperCase();
            done('It should throw one hell of an error');
          } catch (error) {
            expect((error as Error).message).toBe('Invalid Argument!');
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message');
            done(undefined);
          }
        }
      }));
  });
  it('should return uppercase of a valid string', () => {
    const sut = toUpperCase;
    const expected = 'ABC';

    const actual = sut('abc');

    expect(actual).toBe(expected);
  });

  describe('ToUpperCase examples', () => {
    it.each([
      {
        input: 'abc',
        expected: 'ABC',
      },
      {
        input: 'My-String',
        expected: 'MY-STRING',
      },
      {
        input: 'dev',
        expected: 'DEV',
      },
    ])('$input should be $expected', ({ expected, input }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe('getStringInfo for My-String should', () => {
    beforeEach((ctx) => {
      (ctx as IContext).input = 'My-String';
    });
    it('should right length', (ctx) => {
      const actual = getStringInfo((ctx as IContext).input);
      expect(actual.characters.length).toBe(9);
      expect(actual.characters).toHaveLength(9);
    });

    it('should return right lowercase', (ctx) => {
      const actual = getStringInfo((ctx as IContext).input);
      expect(actual.lowerCase).toBe('my-string');
    });

    it('should return right uppercase', (ctx) => {
      const actual = getStringInfo((ctx as IContext).input);
      expect(actual.upperCase).toBe('MY-STRING');
    });

    it('should return right characters', (ctx) => {
      const actual = getStringInfo((ctx as IContext).input);
      expect(actual.characters).toEqual('My-String'.split(''));
      expect(actual.characters).toContain<string>('M');
      expect(actual.characters).toEqual(
        expect.arrayContaining('My-String'.split('').reverse())
      );
    });
    it('should return right extraInfo', (ctx) => {
      const actual = getStringInfo((ctx as IContext).input);

      expect(actual.extraInfo).toEqual({});

      expect(actual.extraInfo).not.toBe(undefined);
      expect(actual.extraInfo).not.toBeUndefined();
      expect(actual.extraInfo).toBeTruthy();
    });
  });
});
