export type { Session } from "next-auth";

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";
