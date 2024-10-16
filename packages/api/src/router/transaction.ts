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
  getTransactionById: protectedProcedure
    .input(
      z.object({
        transactionId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { transactionId } = input;
      const userId = ctx.session.user.id;
      const transaction = await prisma.transaction.findUnique({
        where: {
          userId,
          id: transactionId,
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

      const transactionsByMonth: Record<string, (typeof transactions)[0][]> =
        {};
      transactions.forEach((t: (typeof transactions)[0]) => {
        const date = t.createdAt.toISOString().split("T")[0];

        if (date) {
          if (!transactionsByMonth[date]) {
            transactionsByMonth[date] = [];
          }

          transactionsByMonth[date]?.push(t);
        }
      });
      return transactionsByMonth;
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

      const monthlyData = await Promise.all(
        Array.from({ length: 12 }, async (_, month) => {
          // Define the days for each week
          const weekRanges = [
            { start: 1, end: 7 }, // Week 1: Days 1-7
            { start: 8, end: 14 }, // Week 2: Days 8-14
            { start: 15, end: 21 }, // Week 3: Days 15-21
            { start: 22, end: 31 }, // Week 4: Days 22-31 (handle end of month)
          ];

          const monthlyWeeksData = await Promise.all(
            weekRanges.map(async ({ start, end }, weekIndex) => {
              const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in the month
              const adjustedEnd = Math.min(end, daysInMonth); // Adjust end to not exceed total days

              const startDate = new Date(year, month, start); // Start date for the week
              const endDate = new Date(
                year,
                month,
                adjustedEnd,
                23,
                59,
                59,
                999,
              ); // End date for the week

              const totalIncome = await prisma.transaction.aggregate({
                _sum: {
                  amount: true,
                },
                where: {
                  userId: userId,
                  createdAt: {
                    gte: startDate,
                    lte: endDate,
                  },
                  amount: {
                    gt: 0,
                  },
                },
              });

              const totalExpense = await prisma.transaction.aggregate({
                _sum: {
                  amount: true,
                },
                where: {
                  userId: userId,
                  createdAt: {
                    gte: startDate,
                    lte: endDate,
                  },
                  amount: {
                    lt: 0,
                  },
                },
              });

              const totalIncomeAmount = Number(totalIncome._sum.amount) || 0;
              const totalExpenseAmount = Number(totalExpense._sum.amount) || 0;

              return {
                week: weekIndex + 1, // Week number (1-4)
                income: totalIncomeAmount,
                expense: totalExpenseAmount,
                total: totalIncomeAmount + totalExpenseAmount,
              };
            }),
          );

          return {
            month: month + 1, // Month number (1-12)
            weeks: monthlyWeeksData,
          };
        }),
      );

      return monthlyData;
    }),

  // Retrieve total amount of all transactions
  getTransactionsTotalsByMonth: protectedProcedure
    .input(
      z.object({
        month: z.number().min(1).max(12),
        year: z.number().min(1900).max(new Date().getFullYear()),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { month, year } = input;

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);

      const totalIncome = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId: userId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          amount: {
            gt: 0,
          },
        },
      });

      const totalExpense = await prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId: userId,
          amount: {
            lt: 0,
          },
        },
      });

      const totalIncomeAmount = Number(totalIncome._sum.amount) || 0;
      const totalExpenseAmount = Number(totalExpense._sum.amount) || 0;

      const data = {
        income: totalIncomeAmount,
        expense: totalExpenseAmount,
        total: Number(totalIncomeAmount) + Number(totalExpenseAmount),
      };

      return data;
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
