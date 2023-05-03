import { rest } from '../src/utils';
import fetchMock from 'jest-fetch-mock';

global.fetch = fetch;

describe('Class', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.doMock();
  });
  test('fetch stuff', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'hello' }));

    // call the function that makes the fetch request
    const result = await rest('https://example.com', 'GET');

    // assert the result
    expect(result).toEqual({ message: 'hello' });
  });
  test('fetch stuff with body and headers', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'hello' }));

    // call the function that makes the fetch request
    const result = await rest('https://example.com/test', 'POST', '', {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: '',
    });

    // assert the result
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(`https://example.com/test`);
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: 'POST',
      body: '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: '',
      },
    });
    expect(result).toEqual({ message: 'hello' });
  });

  test('should throw an error for non-OK responses', async () => {
    const response = { error: 'Oops' };
    fetchMock.mockResponseOnce(JSON.stringify(response), { status: 404 });

    await expect(rest('https://example.com/api', 'GET')).rejects.toEqual(
      response,
    );
  });

  test('should throw an error when response cannot be parsed', async () => {
    const url = 'https://example.com/api';
    const responseText = 'error message';

    fetchMock.mockResponseOnce(responseText, { status: 404 });

    await expect(rest(url, 'GET')).rejects.toEqual(responseText);
  });
});
