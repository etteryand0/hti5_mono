import { z } from 'zod'
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc"

export const productsRouter = createTRPCRouter({
    manyFromStore: publicProcedure.input(z.object({
        storeId: z.number()
    })).query(async ({ ctx, input }) => {
        const results = await ctx.db.product.findMany({
            where: {
                storeId: input.storeId
            },
            select: {
                barcodeId: true,
                count: true,
                barcode: {
                    select: {
                        internalName: true
                    }
                }
            }
        })

        return results
    }),
})
