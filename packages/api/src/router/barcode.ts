import { z } from 'zod'
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc"

export const barcodeRouter = createTRPCRouter({
    findUnique: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            const result = await ctx.db.barcode.findUnique({
                where: { code: input }
            })
            return result
        }),
    
    create: protectedProcedure.input(z.object({
        code: z.string(),
        internalName: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const result = await ctx.db.barcode.create({
            data: input
        })

        return result
    })
})
