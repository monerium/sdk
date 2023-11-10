import { useContext } from 'react';
import { MoneriumContext } from './context';

export function useMonerium() {
  const context = useContext(MoneriumContext);
  if (context === null) {
    throw new Error('useMonerium must be used within a MoneriumProvider');
  }
  return context;
}
