import { TRPCError } from "@trpc/server";

import { prisma } from "@mee-tung/db";

import { protectedProcedure } from "../trpc";

export const userRouter = {
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!currentUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found.",
      });
    }

    return currentUser;
  }),
} as const;
