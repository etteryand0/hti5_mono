import { z } from 'zod'
import { createTRPCRouter, protectedStoreOwnerProcedure } from "../trpc"

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
        code: z.number()
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

    createUnplanned: protectedStoreOwnerProcedure.input(z.object({
        code: z.number(),
        internalName: z.string(),
    })).mutation(async ({ input, ctx }) => {
        const result = await ctx.db.purchaseBatch.create({
            data: {
                dealAt: new Date(),
                products: [
                    { connect: {} }
                ]
            }
        })

        return result
    })
})
