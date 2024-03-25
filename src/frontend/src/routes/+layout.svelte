<script lang="ts">
    import { onMount } from 'svelte';
    import * as auth from '$lib/auth';
  
    let authenticated = false;

   console.log(import.meta.env);

  
    onMount(async () => {
      authenticated = await auth.isAuthenticated();
    });
  
    const handleLogin = () => {
      auth.login();
    };
  
    const handleLogout = () => {
      auth.logout();
    };
</script>
  
  {#if authenticated}
    <button on:click={handleLogout}>Logout</button>
    <slot />
  {:else}
    <button on:click={handleLogin}>Login with Internet Identity</button>
  {/if}
  