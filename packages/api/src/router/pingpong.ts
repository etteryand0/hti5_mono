import { createTRPCRouter, publicProcedure } from '../trpc'

export const pingpongRouter = createTRPCRouter({
    ping: publicProcedure.query(() => {
        return "pong"
    })
})
