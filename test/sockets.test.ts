/**
 * @jest-environment jsdom
 */

import { MoneriumClient } from '../src/index';

describe('Sockets', () => {
  it('should create a SafeMoneriumClient instance', () => {
    const client = new MoneriumClient();

    client.bearerProfile = {
      profile: '123',
      access_token: 'accessToken',
      token_type: '',
      expires_in: 555,
      refresh_token: '',
      userId: '',
    };

    const eventHandler = jest.fn();
    // @ts-expect-error - We don't need to mock all the properties
    jest.spyOn(window, 'WebSocket').mockReturnValue({
      addEventListener: eventHandler,
    });

    client.subscribeToOrderNotifications();

    expect(WebSocket).toHaveBeenCalledWith(
      'wss://api.monerium.dev/profiles/123/orders?access_token=accessToken',
    );
  });
});
