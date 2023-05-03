import { placeOrderMessage, rfc3339 } from '../src/utils';

describe('rfc3339', () => {
  test('should format Date to RFC 3339 format', () => {
    const date = new Date(1682820495 * 1000);
    expect(rfc3339(date)).toEqual('2023-04-30T02:08:15Z');
  });

  test('should handle timezone offset for positive offset', () => {
    const date = new Date('2023-04-30T12:00:00+02:00');
    expect(rfc3339(date)).toEqual('2023-04-30T10:00:00Z');
  });

  test('should handle timezone offset for negative offset', () => {
    const date = new Date('2023-04-30T12:00:00-02:00');
    expect(rfc3339(date)).toEqual('2023-04-30T14:00:00Z');
  });
  test('should throw an error if date is not provided', () => {
    expect(() => rfc3339(new Date('what'))).toThrow('Invalid Date');
  });
});

describe('getMessage', () => {
  test('should format message with valid inputs', () => {
    const message = placeOrderMessage({
      currency: 'usd',
      amount: 100,
      iban: 'DE89370400440532013000',
    });
    expect(message).toMatch(
      /^Send USD 100 to DE89370400440532013000 at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
    );
  });
});
