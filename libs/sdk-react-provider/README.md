# Monerium SDK React Provider

# Usage

Wrap the application with the provider and pass the configuration as props.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MoneriumProvider } from '@monerium/sdk-react-provider';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MoneriumProvider clientId="f99e629b-6dca-11ee-8aa6-5273f65ed05b" redirectUrl="https://pntvgs.csb.app/" environment="sandbox">
      <App />
    </MoneriumProvider>
  </StrictMode>
);
```

Use the hook to access the Monerium SDK.

```tsx
import { useMonerium } from '@monerium/sdk-react-provider';

export default function App() {
  const { authorize, isAuthorized, profile, balances, tokens, orders } = useMonerium();
  return (
    <div className="App">
      {!isAuthorized && <button onClick={authorize}>Authorize</button>}
      <h1>Hello {profile ? profile?.email : 'CodeSandbox'}</h1>
    </div>
  );
}
```

## Demo

https://pntvgs.csb.app/

Hook used to access the SDK: https://codesandbox.io/s/monerium-sdk-react-provider-pntvgs?file=/src/App.js

The application is wrapped with MoneriumProvider
https://codesandbox.io/s/monerium-sdk-react-provider-pntvgs?file=/src/index.js

## Running unit tests

Run `nx test sdk-react-provider` to execute the unit tests via [Vitest](https://vitest.dev/).

####
