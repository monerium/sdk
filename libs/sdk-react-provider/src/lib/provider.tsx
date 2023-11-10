import { useCallback, FC, useEffect, useState, ReactNode } from 'react';

import { MoneriumContext } from './context';

import {
  MoneriumClient,
  LinkAddress,
  Profile,
  Balances,
  Order,
  NewOrder,
  Token,
} from '@monerium/sdk';

interface MoneriumProviderProps {
  children: ReactNode;
  clientId?: string;
  redirectUrl?: string;
  environment?: 'sandbox' | 'production';
}

export const MoneriumProvider: FC<MoneriumProviderProps> = ({
  children,
  clientId = 'f99e629b-6dca-11ee-8aa6-5273f65ed05b',
  redirectUrl = 'http://localhost:5173',
  environment = 'sandbox',
}) => {
  const [monerium, setMonerium] = useState<MoneriumClient>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [balances, setBalances] = useState<Balances[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPlaceOrder, setLoadingPlaceOrder] = useState(false);
  const [loadingLinkAddress, setLoadingLinkAddress] = useState(false);
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [error, setError] = useState<Error | unknown | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);

  // Initialize the SDK
  useEffect(() => {
    const sdk = new MoneriumClient({
      environment: environment,
      clientId,
      redirectUrl,
    });
    setMonerium(sdk);
  }, []);

  useEffect(() => {
    const connect = async () => {
      if (monerium) {
        setIsAuthorized(await monerium.connect());
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
          setLoading(true);
          const authCtx = await monerium.getAuthContext();
          const profileData = await monerium.getProfile(authCtx.defaultProfile);
          const balanceData = await monerium.getBalances();
          const ordersData = await monerium.getOrders();
          const tokensData = await monerium.getTokens();
          setProfile(profileData);
          setBalances(balanceData);
          setOrders(ordersData);
          setTokens(tokensData);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [monerium, isAuthorized]);

  const authorize = useCallback(async () => {
    try {
      if (monerium) {
        await monerium.authorize();
      }
    } catch (err) {
      console.error('Error during authorization:', err);
      setError(err);
    }
  }, [monerium]);

  const getBalances = useCallback(async () => {
    if (monerium && isAuthorized) {
      try {
        setLoadingBalances(true);
        const balances = await monerium.getBalances();
        setBalances(balances);
      } catch (err) {
        console.error('Error getting balances:', err);
        setError(err);
      } finally {
        setLoadingBalances(false);
      }
    }
  }, [monerium, isAuthorized]);

  const placeOrder = useCallback(
    async (orderDetails: NewOrder, supportingDocument?: File) => {
      if (monerium && isAuthorized) {
        try {
          setLoadingPlaceOrder(true);

          let documentId;
          if (parseInt(orderDetails.amount) > 15000 && supportingDocument) {
            const uploadedDocument = await monerium.uploadSupportingDocument(
              supportingDocument
            );
            documentId = uploadedDocument.id;
          }

          const newOrderDetails = {
            ...orderDetails,
            documentId: documentId,
          };

          const newOrder = await monerium.placeOrder(newOrderDetails);
          setOrders((prevOrders) => [...prevOrders, newOrder]);
        } catch (err) {
          console.error('Error placing order:', err);
          setError(err);
        } finally {
          setLoadingPlaceOrder(false);
        }
      }
    },
    [monerium, isAuthorized]
  );

  const linkAddress = useCallback(
    async (addressDetails: LinkAddress) => {
      if (monerium && isAuthorized && profile) {
        try {
          setLoadingLinkAddress(true);
          return await monerium.linkAddress(profile.id, addressDetails);

          // Update your state or do something with linkedAddress
        } catch (err) {
          console.error('Error linking address:', err);
          setError(err);
        } finally {
          setLoadingLinkAddress(false);
        }
      }
    },
    [monerium, isAuthorized, profile]
  );

  //

  return (
    <MoneriumContext.Provider
      value={{
        authorize,
        isAuthorized,
        profile,
        balances,
        loading,
        loadingPlaceOrder,
        loadingLinkAddress,
        loadingBalances,
        getBalances,
        linkAddress,
        placeOrder,
        orders,
        tokens,
        error,
      }}
    >
      {children}
    </MoneriumContext.Provider>
  );
};
