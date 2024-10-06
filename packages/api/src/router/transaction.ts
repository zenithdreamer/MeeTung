import { TRPCError } from "@trpc/server";

import { prisma } from "@mee-tung/db";
import { createtransactionschema } from "@mee-tung/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const transactionRouter = {};
