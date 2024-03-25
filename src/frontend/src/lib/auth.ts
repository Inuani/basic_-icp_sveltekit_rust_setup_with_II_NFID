import { AuthClient } from '@dfinity/auth-client';

let authClient: AuthClient | null = null;

export const initAuth = async () => {
  authClient = await AuthClient.create();
};

export const isAuthenticated = async () => {
  if (!authClient) await initAuth();
  return authClient.isAuthenticated();
};

function popupCenter({ width, height }: { width: number; height: number }) {
  const top = window.innerHeight / 2 - height / 2 + window.screenY;
  const left = window.innerWidth / 2 - width / 2 + window.screenX;
  return `top=${top},left=${left},width=${width},height=${height}`;
}

export const login = async () => {
    if (!authClient) await initAuth();
    const IIcanisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
    console.log(IIcanisterId);
    const identityProvider = process.env.DFX_NETWORK === 'ic'
    ? 'https://identity.ic0.app/#authorize'
    : `http://127.0.0.1:4943/?canisterId=${IIcanisterId}`;
  await authClient?.login({
    identityProvider,
    maxTimeToLive: BigInt(30 * 24 * 60 * 60 * 1000 * 1000 * 1000 * 1000),
    onSuccess: () => {
      window.location.href = '/';
    },
    windowOpenerFeatures: popupCenter({ width: 600, height: 600 })
  });
};

export const logout = async () => {
  if (authClient) {
    await authClient.logout();
    window.location.reload();
  }
};
