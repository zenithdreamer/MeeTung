import crypto from "crypto";
import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";

import { invalidateSessionToken } from "@mee-tung/auth";
import { prisma } from "@mee-tung/db";
import { LoginPostSchema, RegisterPostSchema } from "@mee-tung/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

function getRandomHexWithRandomCase(length: number) {
  const hex = crypto.randomBytes(length).toString("hex");
  return [...hex]
    .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char))
    .join("");
}

export const authRouter = {
  login: publicProcedure.input(LoginPostSchema).mutation(async ({ input }) => {
    const { username, password } = input;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      // Perform a fake verification to consume the same amount of time for security reasons
      const fakeHash = await argon2.hash("fake-hash");
      await argon2.verify(fakeHash, password);
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    const isCredentialsValid = await argon2.verify(user.password, password);

    if (!isCredentialsValid)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });

    const token = await prisma.session.create({
      data: {
        user: {
          connect: {
            id: user.id, // Connecting using user ID
          },
        },
        // 1 month expiration
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        token: getRandomHexWithRandomCase(64),
      },
    });

    return {
      success: true,
      token: token.token,
    };
  }),

  register: publicProcedure
    .input(RegisterPostSchema)
    .mutation(async ({ input }) => {
      const { username, firstname, lastname, password } = input;

      const existingUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username is already taken",
        });
      }

      const hashedPassword = await argon2.hash(password);

      await prisma.user.create({
        data: {
          username,
          firstname,
          lastname,
          password: hashedPassword,
        },
      });

      return {
        success: true,
      };
    }),

  logout: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false };
    }
    await invalidateSessionToken(opts.ctx.token);
    return { success: true };
  }),
} satisfies TRPCRouterRecord;
