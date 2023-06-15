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

export const rest = async <T>(
  url: string,
  method: string,
  body?: BodyInit | Record<string, string>,
  headers?: Record<string, string>,
): Promise<T> => {
  const res = await fetch(`${url}`, {
    method,
    headers,
    body: body as unknown as BodyInit,
  });

  let response;
  const text = await res.text();

  try {
    response = JSON.parse(text);
  } catch (err) {
    throw text;
  }

  if (!res.ok) {
    throw response;
  }

  return response as T;
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
export const placeOrderMessage = (amount: string | number, iban: string) =>
  `Send EUR ${amount} to ${iban} at ${rfc3339(new Date())}`;

/**
 * Replacement for URLSearchParams, Metamask snaps do not include node globals.
 * It will not handle all special characters the same way as URLSearchParams, but it will be good enough for our use case.
 * @param body a json format of the body to be encoded
 * @returns 'application/x-www-form-urlencoded' compatible string
 */
export const urlEncoded = (
  body: Record<string, string>,
): string | undefined => {
  return body && Object.entries(body)?.length > 0
    ? Object.entries(body)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join('&')
    : '';
};
