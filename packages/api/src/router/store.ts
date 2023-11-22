import { z } from 'zod'
import { publicProcedure, createTRPCRouter, protectedStoreOwnerProcedure } from "../trpc"

export const storeRouter = createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
        const results = await ctx.db.store.findMany({
            orderBy: {
                title: "asc",
            }
        })

        return results
    }),

    findUnique: publicProcedure.input(z.object({
        id: z.number()
    })).query(async ({ input, ctx }) => {
        const store = await ctx.db.store.findUnique({
            where: {
                id: input.id,
            }
        })

        return store
    }),
    
    create: protectedStoreOwnerProcedure.input(z.object({
        town: z.string(),
        address: z.string(),
        title: z.string(),
        store_type: z.enum(["Grocery", "Pharmacy", "Other"]),
        contact_number: z.string().nullable(),
    }))
    .mutation(async ({ input, ctx }) => {
        const result = await ctx.db.store.create({
            data: {
                owner: { connect: { id: ctx.user.sub } },
                ...input,
            },
        })
        return result
    }),

    delete: protectedStoreOwnerProcedure.input(z.object({
        id: z.number(),
    })).mutation(async ({ input, ctx }) => {
        const result = await ctx.db.store.delete({
            where: {
                id: input.id,
            }
        })
        return result
    })
})
