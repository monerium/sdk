<script lang="ts">
  import { MoneriumClient } from '@monerium/sdk';
  let client = new MoneriumClient({
    clientId: 'f99e629b-6dca-11ee-8aa6-5273f65ed05b',
    redirectUrl: 'http://localhost:4200',
  });

  let authCtx;
  let isAuthorized = true;
  (async () => {
    isAuthorized = await client.getAccess();
    authCtx = await client.getAuthContext();
    console.log(authCtx);
  })();
</script>

{#if !isAuthorized}
  <button on:click={() => client.authorize()}> Connect </button>
{/if}
<p>{authCtx?.name || authCtx?.email}</p>
