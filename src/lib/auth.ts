/** Shape of the signed-in user the original portal reads `full_name` / `email` from. */
export interface User {
  full_name?: string;
  email?: string;
}

/**
 * The original portal is published as "public without login", so every visitor is
 * anonymous and `user` is always null there. Kept as a hook so a real auth provider
 * can be plugged in without touching the pages.
 */
export function useUser(): User | null {
  return null;
}
