import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "@mee-tung/db";
import { CreateCategorySchema } from "@mee-tung/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const categoryRouter = {
  createCategory: protectedProcedure
    .input(CreateCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const category = await prisma.category.create({
        data: {
          name: input.name,
          userId: userId,
        },
      });

      return category;
    }),

  getCategoryById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const category = await prisma.category.findUnique({
          where: {
            id,
          },
        });

        if (!category) {
          throw new Error(`Category with id ${id} not found.`);
        }

        return category;
      } catch (error) {
        console.error("Error fetching category:", error);
        throw new Error("Could not retrieve category.");
      }
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

    // Change all transactions with this category method to null
    await prisma.transaction.updateMany({
      where: {
        categoryId: id,
      },
      data: {
        categoryId: null,
      },
    });

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  }),
};
