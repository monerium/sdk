import { Currency } from 'types';

export const generateRandomString = () => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 128) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const rfc3339 = (d: Date) => {
  if (d.toString() === 'Invalid Date') {
    throw d;
  }
  const pad = (n: number) => {
    return n < 10 ? '0' + n : n;
  };

  const timezoneOffset = (offset: number) => {
    if (offset === 0) {
      return 'Z';
    }
    const sign = offset > 0 ? '-' : '+';
    offset = Math.abs(offset);
    return sign + pad(Math.floor(offset / 60)) + ':' + pad(offset % 60);
  };

  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds()) +
    timezoneOffset(d.getTimezoneOffset())
  );
};

/**
 * The message to be signed when placing an order.
 *
 * @returns string
 */
export const placeOrderMessage = ({
  currency,
  amount,
  iban,
}: {
  currency: Currency | Uppercase<Currency> | string;
  amount: string | number;
  iban: string;
}) =>
  `Send ${currency.toUpperCase()} ${amount} to ${iban} at ${rfc3339(
    new Date(),
  )}`;
