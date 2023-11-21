import { z } from 'zod'
import { publicProcedure, protectedProcedure, createTRPCRouter } from "../trpc"

export const postRouter = createTRPCRouter({
    findMany: publicProcedure.query(async ({ input, ctx }) => {
        const posts = await ctx.db.post.findMany()
        return posts
    }),

    create: protectedProcedure.input(z.object({
        name: z.string()
    })).mutation(async ({ input, ctx }) => {
        const post = await ctx.db.post.create({
            data: {
                name: input.name,
            },
        })
        return post
    })
})
