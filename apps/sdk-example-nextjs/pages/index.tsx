import styles from './index.module.css';
import { useMonerium } from '@monerium/sdk-react-provider';
export function Index() {
  const {
    authorize,
    isAuthorized,
    profile,
    balances,
    tokens,
    orders,
    loading,
  } = useMonerium();

  return (
    <div className={styles.page}>
      {!isAuthorized ? (
        <button type="button" onClick={authorize}>
          Authorize
        </button>
      ) : (
        <div>Authorized</div>
      )}
      {loading ? <div>Loading...</div> : <div>Not loading</div>}
      {profile ? <div>Profile: {JSON.stringify(profile)}</div> : null}
      {balances ? <div>Balances: {JSON.stringify(balances)}</div> : null}
      {tokens ? <div>tokens: {JSON.stringify(tokens)}</div> : null}
      {orders ? <div>orders: {JSON.stringify(orders)}</div> : null}
    </div>
  );
}

export default Index;
