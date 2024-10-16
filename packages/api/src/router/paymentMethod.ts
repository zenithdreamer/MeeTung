import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@mee-tung/db";
import { CreatePaymentMethodSchema } from "@mee-tung/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const paymentMethodRouter = {
  createType: publicProcedure
    .input(CreatePaymentMethodSchema)
    .mutation(async ({ input }) => {
      const { name, userId } = input;

      const type = await prisma.paymentMethod.create({
        data: {
          name,
          userId,
        },
      });

      return type;
    }),

  getTypes: protectedProcedure.query(async ({ ctx }) => {
    const paymentMethods = await prisma.paymentMethod.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return paymentMethods;
  }),

  getTypeById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const paymentMethod = await prisma.paymentMethod.findUnique({
          where: {
            id,
          },
        });

        if (!paymentMethod) {
          throw new Error(`Payment method with ID ${id} not found.`);
        }

        return paymentMethod;
      } catch (error) {
        console.error("Error fetching payment method:", error);
        throw new Error("Could not retrieve payment method.");
      }
    }),

  deleteType: protectedProcedure.query(async ({ input }) => {
    const id = input;

    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: {
        id,
      },
    });

    if (!paymentMethod) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Payment method not found.",
      });
    }

    // Change all transactions with this payment method to null
    await prisma.transaction.updateMany({
      where: {
        paymentMethodId: id,
      },
      data: {
        paymentMethodId: null,
      },
    });

    await prisma.paymentMethod.delete({
      where: {
        id,
      },
    });

    return paymentMethod;
  }),
};
