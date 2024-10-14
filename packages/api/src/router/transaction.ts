import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@mee-tung/db";
import {
  createTransactionSchema,
  editTransactionSchema,
} from "@mee-tung/validators";

import { protectedProcedure } from "../trpc";

export const transactionRouter = {
  // Create Transaction
  create: protectedProcedure
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
          createdAt: input.createdAt, // Uses input createdAt or default now()
        },
      });

      return transaction;
    }),

  // Retrieve all transactions by a specific day
  getTransactionsByDay: protectedProcedure
    .input(
      z.object({
        date: z.string(), // Example input format: "2024-06-13"
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const startDate = new Date(input.date); // start of the day
      const endDate = new Date(new Date(input.date).setHours(23, 59, 59, 999));

      const transactions = await prisma.transaction.findMany({
        where: {
          userId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return transactions;
    }),

  // Retrieve all transactions by a specific month
  getTransactionsByMonth: protectedProcedure
    .input(
      z.object({
        month: z.number().min(1).max(12), // Month (1-12)
        year: z.number().min(1900).max(new Date().getFullYear()), // Year
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { month, year } = input;

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);

      const transactions = await prisma.transaction.findMany({
        where: {
          userId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      console.log(transactions);

      const transactionsByDate = {};
      transactions.forEach((t) => {
        const date = t.createdAt.toISOString().split("T")[0];

        if (!transactionsByDate[date]) {
          transactionsByDate[date] = [];
        }

        transactionsByDate[date].push(t);
      });
      return transactionsByDate;
    }),

  // Retrieve all transactions by a specific year
  getTransactionsByYear: protectedProcedure
    .input(
      z.object({
        year: z.number().min(1900).max(new Date().getFullYear()), // Year
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { year } = input;

      const startDate = new Date(year, 0, 1); // Start of the year
      const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // End of the year

      const transactions = await prisma.transaction.findMany({
        where: {
          userId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return transactions;
    }),

  // Edit Transaction
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

      return transaction;
    }),

  // Delete Transaction
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
