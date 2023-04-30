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
  body?: BodyInit,
  headers?: Record<string, string>,
): Promise<T> => {
  const res = await fetch(`${url}`, {
    method,
    headers,
    body,
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
