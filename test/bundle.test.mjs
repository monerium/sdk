/**
 * @jest-environment jsdom
 */

import { MoneriumClient } from '../dist/index.mjs';
import {
  APP_ONE_CREDENTIALS_SECRET,
  APP_ONE_CREDENTIALS_CLIENT_ID,
  APP_ONE_OWNER_USER_ID,
} from './constants.js';

test('ES Module bundle smoke test', async () => {
  const client = new MoneriumClient();

  await client.auth({
    client_id: APP_ONE_CREDENTIALS_CLIENT_ID,
    client_secret: APP_ONE_CREDENTIALS_SECRET,
  });

  const authContext = await client.getAuthContext();

  expect(authContext.userId).toBe(APP_ONE_OWNER_USER_ID);
});
