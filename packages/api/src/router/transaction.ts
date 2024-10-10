import { TRPCError } from "@trpc/server";

import { prisma } from "@mee-tung/db";
import {
  createTransactionSchema,
  editTransactionSchema,
} from "@mee-tung/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const transactionRouter = {
  createTransactionSchema: protectedProcedure
    .input(createTransactionSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const transaction = await prisma.transaction.create({
        data: {
          amount: input.amount,
          description: input.description,
          categoryId: input.categoryId,
          paymentMethodId: input.paymentMethodId,
          userId: userId,
        },
      });

      return transaction;
    }),

  getTransactions: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });
    return transactions;
  }),

  editTransaction: protectedProcedure
    .input(editTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const transaction = await prisma.transaction.update({
        where: {
          id: input.id,
          userId: userId,
        },
        data: {
          amount: input.amount,
          description: input.description ?? undefined,
          categoryId: input.categoryId,
          paymentMethodId: input.paymentMethodId,
        },
      });

      if (!transaction) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "transaction not found.",
        });
      }

      return transaction;
    }),

  deleteTransactions: protectedProcedure.query(async ({ input }) => {
    const id = input;

    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Transaction not found.",
      });
    }

    await prisma.transaction.delete({
      where: {
        id,
      },
    });

    return transaction;
  }),
};
