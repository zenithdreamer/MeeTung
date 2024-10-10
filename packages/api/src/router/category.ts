import { TRPCError } from "@trpc/server";

import { prisma } from "@mee-tung/db";
import { createCategorySchema } from "@mee-tung/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const categoryRouter = {
  createCategory: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }
      const userId = ctx.session.user.id;

      const category = await prisma.category.create({
        data: {
          name: input.name,
          userId: userId,
        },
      });

      return category;
    }),

  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const categories = await prisma.category.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return categories;
  }),

  deleteCategory: protectedProcedure.query(async ({ input }) => {
    const id = input;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Category not found.",
      });
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  }),
};
