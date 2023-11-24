import { z } from 'zod'
import { protectedStoreOwnerProcedure, createTRPCRouter, protectedProcedure } from "../trpc"

export const purchaseProductRouter = createTRPCRouter({
    findManyByBatchId: protectedStoreOwnerProcedure
        .input(z.number())
        .query(async ({ input, ctx }) => {
            const results = await ctx.db.purchaseProduct.findMany({
                where: {
                    purchaseBatchId: { equals: input }
                }
            })

            return results
        }),

    soonExpiring: protectedProcedure.input(z.object({
        storeId: z.number()
    })).query(async ({ ctx, input }) => {
        const results = await ctx.db.purchaseProduct.findMany({
            where: {
                // storeId: input.storeId,
                purchaseBatch: {
                    storeId: input.storeId
                }
            },
            select: {
                barcodeId: true,
                count: true,
                expirationDate: true,
                barcode: {
                    select: {
                        internalName: true
                    }
                }
            }
        })

        const now = new Date()
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDay())

        return results.filter(({ expirationDate }) => (now.getTime() <= expirationDate.getTime()) && (expirationDate.getTime() <= nextMonth.getTime()))
    })
})
