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
