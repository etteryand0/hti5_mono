import { createTRPCRouter } from "./trpc";
import { pingpongRouter } from "./router/pingpong";
import { authRouter } from "./router/auth";
import { storeRouter } from "./router/store"
import { purchaseBatchRouter } from "./router/purchaseBatch"
import { purchaseProductRouter } from "./router/purchaseProduct"
import { barcodeRouter } from "./router/barcode"
import { productsRouter } from "./router/products"
// Router imports

export const appRouter = createTRPCRouter({
  pingpong: pingpongRouter,
  auth: authRouter,
  store: storeRouter,
  purchaseBatch: purchaseBatchRouter,
  purchaseProduct: purchaseProductRouter,
  barcode: barcodeRouter,
  products: productsRouter,
// Router exports
});

// export type definition of API
export type AppRouter = typeof appRouter;
