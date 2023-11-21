import { createTRPCRouter } from "./trpc";
import { pingpongRouter } from "./router/pingpong";
import { authRouter } from "./router/auth";
import { postRouter } from "./router/post"
// Router imports

export const appRouter = createTRPCRouter({
  pingpong: pingpongRouter,
  auth: authRouter,
  post: postRouter
// Router exports
});

// export type definition of API
export type AppRouter = typeof appRouter;
