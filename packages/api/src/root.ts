import { authRouter } from "./router/auth";
import { categoryRouter } from "./router/category";
import { paymentMethodRouter } from "./router/paymentMethod";
import { transactionRouter } from "./router/transaction";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  transaction: transactionRouter,
  category: categoryRouter,
  paymentmethod: paymentMethodRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
