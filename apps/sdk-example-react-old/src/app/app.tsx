// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { MoneriumClient, AuthContext } from '@monerium/sdk';

const client = new MoneriumClient('sandbox');

/**
 * This is an example of how we expect the SDK to be used in version 2.6.x
 * These functions have been deprecated but this is here for backwards compatibility.
 */
export function App() {
  const [authCtx, setAuthCtx] = useState<AuthContext | null>(null);
  const authorize = async () => {
    const authFlowUrl = client.getAuthFlowURI({
      client_id: 'f99e629b-6dca-11ee-8aa6-5273f65ed05b',
      redirect_uri: 'http://localhost:4200',
      // optional automatic wallet selection:
      // network: "mumbai",
      // chain: "polygon",
      // address: "0xValidAddress72413Fa92980B889A1eCE84dD",
      // signature: "0xValidSignature0df2b6c9e0fc067ab29bdbf322bec30aad7c46dcd97f62498a91ef7795957397e0f49426e000b0f500c347219ddd98dc5080982563055e918031c"
    });
    window.localStorage.setItem(
      'myCodeVerifier',
      client.codeVerifier as string
    );
    window.location.replace(authFlowUrl);
  };
  useEffect(() => {
    const codeVerifier = window.localStorage.getItem('myCodeVerifier');
    const code = new URLSearchParams(window.location.search).get(
      'code'
    ) as string;
    const access = async () => {
      await client.auth({
        client_id: 'f99e629b-6dca-11ee-8aa6-5273f65ed05b',
        code: code,
        code_verifier: codeVerifier as string,
        redirect_uri: 'http://localhost:4200',
      });
      if (client.bearerProfile) {
        console.log(client.bearerProfile);
        setAuthCtx(await client.getAuthContext());
      }
    };
    if (codeVerifier && code) {
      access();
    }
  }, []);

  return (
    <div>
      <button onClick={() => authorize()}>Connect</button>

      <p>{authCtx?.name || authCtx?.email}</p>
    </div>
  );
}

export default App;
