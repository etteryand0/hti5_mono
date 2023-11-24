import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, protectedStoreOwnerProcedure } from "../trpc"

export const purchaseBatchRouter = createTRPCRouter({
    list: protectedStoreOwnerProcedure.query(async ({ ctx }) => {
        const results = await ctx.db.purchaseBatch.findMany({
            where: {
                store: {
                    ownerId: { equals: ctx.user.sub }
                }
            }
        })
        
        return results
    }),

    findUnique: protectedStoreOwnerProcedure.input(z.object({
        code: z.string()
    })).query(async ({ input, ctx }) => {
        const result = await ctx.db.barcode.findUnique({
            where: {
                code: input.code
            },
            select: {
                internalName: true,
            }
        })
        
        return result
    }),

    myPlannedBatches: protectedProcedure.query(async ({ ctx }) => {
        const allBatches = await ctx.db.purchaseBatch.findMany({
            where: {
                store: {
                    ownerId: ctx.user.sub
                },
            }
        })

        const now = new Date()
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDay())

        return allBatches.filter(({dealAt}) => (now.getTime() <= dealAt.getTime()) && (dealAt.getTime() <= nextMonth.getTime()))
    }),

    create: protectedProcedure.input(z.object({
        batchProducts: z.array(z.object({
            barcodeId: z.string(),
            count: z.number(),
            expirationDate: z.date(),
        })),
        storeId: z.number(),
        dealAt: z.date(),
        complete: z.boolean(),
    })).mutation(async ({ input, ctx }) => {
        const result = await ctx.db.purchaseBatch.create({
            data: {
                storeId: input.storeId,
                dealAt: input.dealAt,
                products: {
                    createMany: {
                        data: input.batchProducts
                    }
                }
            },
        })

        if (!input.complete) {
            return result
        }

        input.batchProducts.map(async ({barcodeId, count}) => {
            const product = await ctx.db.product.findFirst({
                where: {
                    barcodeId,
                    storeId: input.storeId
                }
            })
            if (product === null) {
                await ctx.db.product.create({
                    data: {
                        count,
                        barcodeId,
                        storeId: input.storeId,
                    }
                })
            } else {
                await ctx.db.product.updateMany({
                    where: {
                        barcodeId,
                        storeId: input.storeId,
                    },
                    data: {
                        count: {increment: count}
                    }
                })
            }
        })

        return result
    })
})
