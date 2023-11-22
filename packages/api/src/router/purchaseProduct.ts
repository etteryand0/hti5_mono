import { z } from 'zod'
import { protectedStoreOwnerProcedure, createTRPCRouter } from "../trpc"

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


    addGroup: protectedStoreOwnerProcedure.input(z.object({
        barcode: z.number(),
        purchaseBatchId: z.number(),
        wholesalePricePerUnit: z.number(),
        count: z.number(),
        expirationDate: z.date(),
    })).mutation(async ({ input, ctx }) => {
        const { barcode, purchaseBatchId, ...data } = input
        const result = await ctx.db.purchaseProduct.create({
            data: {
                ...data,
                barcode: { connect: { code: barcode }},
                purchaseBatch: { connect: { id: purchaseBatchId }}
            },
            select: { id: true }
        })

        return result
    }),

    updateGroup: protectedStoreOwnerProcedure.input(z.object({
        where: z.object({
            id: z.number(),
        }),
        data: z.object({
            wholesalePricePerUnit: z.number(),
            count: z.number(),
            expirationDate: z.date(),
        })
    })).mutation(async ({ input: { where, data }, ctx }) => {
        const result = await ctx.db.purchaseProduct.update({
            where,
            data,
        })

        return result
    }),

    deleteGroup: protectedStoreOwnerProcedure.input(z.object({
        id: z.number(),
    })).mutation(async ({ input, ctx }) => {
        const result = await ctx.db.purchaseProduct.delete({
            where: {
                id: input.id,
            }
        })

        return result
    })
})
