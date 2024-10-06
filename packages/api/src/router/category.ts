import { TRPCError } from "@trpc/server";

import { prisma } from "@mee-tung/db";
import { createCategorySchema } from "@mee-tung/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const categoryRouter = {
  craeteCategory: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ input }) => {
      const { name, userId } = input;

      const category = await prisma.category.create({
        data: {
          name,
          userId,
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
