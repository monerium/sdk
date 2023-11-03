/**
 * @jest-environment jsdom
 */
import 'jest-localstorage-mock';
import { STORAGE_CODE_VERIFIER } from '../src/constants';
import {
  getAuthFlowUrlAndStoreCodeVerifier,
  generateCodeChallenge,
} from '../src/helpers/auth.helpers';

describe('getAuthFlowUrlAndStoreCodeVerifier', () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  test('should generate auth flow URL and store code verifier', () => {
    const baseUrl = 'https://api.test.com';
    const args = {
      client_id: 'testClientId',
      redirect_uri: 'http://example.com',
    };

    const url = getAuthFlowUrlAndStoreCodeVerifier(baseUrl, args);

    const codeVerifier = sessionStorage.getItem(STORAGE_CODE_VERIFIER);
    const codeChallenge = generateCodeChallenge(codeVerifier as string);

    expect(url).toContain(baseUrl);
    expect(url).toContain(`client_id=${args.client_id}`);
    expect(url).toContain(
      `redirect_uri=${encodeURIComponent(args.redirect_uri)}`,
    );
    expect(url).toContain(`code_challenge=${codeChallenge}`);
    expect(codeVerifier).toBeTruthy();
  });
});
