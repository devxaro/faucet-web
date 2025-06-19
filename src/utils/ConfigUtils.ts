export const throwErrorIfEnvVarsNotFound = () => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL not set in environment variables");
  }

  if (!import.meta.env.VITE_HMAC_SECRET_KEY) {
    throw new Error("VITE_HMAC_SECRET_KEY not set in environment variables");
  }

  if (!import.meta.env.VITE_EXPLORER_URL) {
    throw new Error("VITE_EXPLORER_URL not set in environment variables");
  }

  if (!import.meta.env.VITE_DEFAULT_ADDRESS) {
    throw new Error("VITE_DEFAULT_ADDRESS not set in environment variables");
  }

  if (!import.meta.env.VITE_MIN_SCORE) {
    throw new Error("VITE_MIN_SCORE not set in environment variables");
  }
};
