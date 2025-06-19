/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_HMAC_SECRET_KEY: string;
  readonly VITE_EXPLORER_URL: string;
  readonly VITE_DEFAULT_ADDRESS: string;
  readonly VITE_MIN_SCORE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
