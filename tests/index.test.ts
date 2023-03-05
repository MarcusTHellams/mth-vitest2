import nodemailer from 'nodemailer';
import { type MockInstance } from 'vitest';

import { main } from '../src';

vi.mock('nodemailer', () => {
  return {
    __esModule: true,
    default: {
      createTransport: vi.fn(),
    },
  };
});

describe('Testing Index Suite', () => {
  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it('should console log id successfully', async () => {
    (nodemailer.createTransport as unknown as MockInstance).mockReturnValueOnce(
      {
        sendMail: vi
          .fn()
          .mockResolvedValueOnce({ messageId: 'Sent Email Successfully' }),
      }
    );
    vi.spyOn(console, 'log');
    await main();
    expect(console.log).toBeCalledWith(
      expect.stringContaining('messageId'),
      expect.stringContaining('Successfully')
    );
    expect(console.log).toHaveBeenCalledWith(
      '🚀 ~ file: index.ts:16 ~ main ~ messageId:',
      'Sent Email Successfully'
    );
  });
  it('should console log unsuccessfully', async () => {
    (nodemailer.createTransport as unknown as MockInstance).mockReturnValueOnce(
      {
        sendMail: vi
          .fn()
          .mockResolvedValueOnce({ messageId: 'Sent Email unsuccessfully' }),
      }
    );
    vi.spyOn(console, 'log');
    await main();
    expect(console.log).toHaveBeenCalledWith(
      '🚀 ~ file: index.ts:16 ~ main ~ messageId:',
      'Sent Email unsuccessfully'
    );
  });
  it('should console error something went wrong', async () => {
    (nodemailer.createTransport as unknown as MockInstance).mockReturnValueOnce(
      {
        sendMail: vi
          .fn()
          .mockRejectedValueOnce(new Error('Something went wrong')),
      }
    );
    vi.spyOn(console, 'error');
    await main();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('error:'),
      expect.stringContaining('Something went wrong')
    );
  });
});
