const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_BACKEND_ORIGIN?.trim();

  if (configuredUrl) {
    return `${trimTrailingSlashes(configuredUrl)}/api/v1`;
  }

  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/v1`;
  }

  return "http://localhost:8000/api/v1";
};

export const API_BASE_URL = getApiBaseUrl();