const DEFAULT_API_TIMEOUT_MS = 10000;

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

const parsedTimeout = Number(import.meta.env.VITE_API_TIMEOUT_MS);
export const API_TIMEOUT_MS =
  Number.isFinite(parsedTimeout) && parsedTimeout > 0
    ? parsedTimeout
    : DEFAULT_API_TIMEOUT_MS;

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  users: `${API_BASE_URL}/users`,
  clothes: `${API_BASE_URL}/clothes`,
  orders: `${API_BASE_URL}/orders`,
} as const;

export function resolveBackendAssetUrl(
  assetPath: string | null | undefined,
): string {
  if (!assetPath) {
    return "";
  }

  if (
    assetPath.startsWith("http://") ||
    assetPath.startsWith("https://") ||
    assetPath.startsWith("data:") ||
    assetPath.startsWith("blob:")
  ) {
    return assetPath;
  }

  return assetPath.startsWith("/")
    ? `${API_BASE_URL}${assetPath}`
    : `${API_BASE_URL}/${assetPath}`;
}
