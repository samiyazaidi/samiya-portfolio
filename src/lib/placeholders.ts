export function safeDestination(
  value: string | null | undefined,
  allowAsset = false,
): string | null {
  if (!value || value.includes("[") || value.includes("]")) return null;
  if (allowAsset && /^\/(?!\/)[^\s]+$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (["https:", "mailto:", "tel:"].includes(url.protocol)) return value;
  } catch {
    /* Intentional unavailable state. */
  }
  return null;
}
