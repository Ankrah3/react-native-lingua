import { createClerkClient } from "@clerk/backend";

// Server-only. Never import this file from client-rendered screens or
// components - it reads the Clerk secret key and must not end up in the
// app bundle.
const secretKey = process.env.CLERK_SECRET_KEY;
// authenticateRequest() needs the publishable key too (to resolve the
// instance's JWKS). We only define the EXPO_PUBLIC_-prefixed one since it
// also has to reach the client bundle, so reuse it here rather than
// defining the same value twice under two env var names.
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!secretKey) {
  throw new Error("Add CLERK_SECRET_KEY to your server environment");
}
if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your server environment");
}

export const clerkClient = createClerkClient({ secretKey, publishableKey });

export class UnauthorizedError extends Error {}

/**
 * Authenticates an incoming Expo API route request against the caller's
 * Clerk session (sent as an `Authorization: Bearer <token>` header from
 * `useAuth().getToken()`) and returns the authenticated Clerk user id.
 * Never trust a client-supplied user id instead of this.
 */
export async function requireAuthenticatedUserId(
  request: Request,
): Promise<string> {
  const requestState = await clerkClient.authenticateRequest(request);

  if (!requestState.isAuthenticated) {
    throw new UnauthorizedError(
      `Request is not authenticated: ${requestState.reason} - ${requestState.message}`,
    );
  }

  const { userId } = requestState.toAuth();
  if (!userId) {
    throw new UnauthorizedError("Authenticated request has no user id");
  }

  return userId;
}
