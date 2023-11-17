// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { MoneriumClient, AuthContext } from '@monerium/sdk';

export function App() {
  const [authCtx, setAuthCtx] = useState<AuthContext | null>(null);
  const [monerium, setMonerium] = useState<MoneriumClient>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const sdk = new MoneriumClient({
      environment: 'sandbox',
      clientId: 'f99e629b-6dca-11ee-8aa6-5273f65ed05b',
      redirectUrl: 'http://localhost:4200',
    });
    setMonerium(sdk);
  }, []);

  useEffect(() => {
    const connect = async () => {
      if (monerium) {
        setIsAuthorized(await monerium.getAccess());
      }
    };

    connect();

    return () => {
      if (monerium) {
        monerium.disconnect();
      }
    };
  }, [monerium]);

  useEffect(() => {
    const fetchData = async () => {
      if (monerium && isAuthorized) {
        try {
          setAuthCtx(await monerium.getAuthContext());
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    };
    fetchData();
  }, [monerium, isAuthorized]);

  return (
    <div>
      {!isAuthorized && (
        <button
          onClick={() =>
            monerium?.authorize({
              // address: '0xValidAddress72413Fa92980B889A1eCE84dD',
              // signature: '0x',
              // chainId: 137,
            })
          }
        >
          Connect
        </button>
      )}

      <p>{authCtx?.name || authCtx?.email}</p>
    </div>
  );
}

export default App;
