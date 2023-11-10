import { createContext } from 'react';
import {
  Profile,
  Balances,
  LinkAddress,
  Order,
  NewOrder,
  Token,
} from '@monerium/sdk';

interface MoneriumContextValue {
  authorize: () => Promise<void>;
  isAuthorized: boolean;
  profile: Profile | null;
  balances: Balances[] | null;
  loading: boolean;
  loadingPlaceOrder: boolean;
  loadingLinkAddress: boolean;
  loadingBalances: boolean;
  getBalances: () => Promise<void>;
  linkAddress: (addressDetails: LinkAddress) => Promise<unknown>;
  placeOrder: (
    orderDetails: NewOrder,
    supportingDocument?: File
  ) => Promise<void>;
  orders: Order[];
  tokens: Token[];
  error: unknown;
}

export const MoneriumContext = createContext<MoneriumContextValue | null>(null);
