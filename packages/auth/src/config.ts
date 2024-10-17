/* eslint-disable no-restricted-properties */
import type { DefaultSession, Session as NextAuthSession } from "next-auth";

import { prisma } from "@mee-tung/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const isSecureContext = process.env.NODE_ENV !== "development";

export const validateToken = async (
  token: string,
): Promise<NextAuthSession | null> => {
  const session = await prisma.session.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
  return session
    ? {
        user: {
          ...session.user,
        },
        expires: session.expires_at.toISOString(),
      }
    : null;
};

export const invalidateSessionToken = async (token: string) => {
  await prisma.session.delete({
    where: {
      token: token,
    },
  });
};
