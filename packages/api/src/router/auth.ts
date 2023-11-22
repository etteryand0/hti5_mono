import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
    login: publicProcedure.input(z.object({
        email: z.string().trim().email(),
        password: z.string().trim().min(8).max(128),
    })).mutation(async ({ input, ctx }) => {
        const credUser = await ctx.db.user.findUnique({ 
            where: { email: input.email },
            select: { id: true, password: true, isStoreOwner: true }
        })

        if (credUser === null) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Wrong credentials" })
        }

        const isAuthenticated =  await bcrypt.compare(input.password, credUser.password)
        if (!isAuthenticated) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Wrong credentials" })
        }

        const token = jwt.sign({
            email: input.email,
            sub: credUser.id,
            isStoreOwner: credUser.isStoreOwner,
        }, "jwtsecret")

        return { token }
    }),

    signup: publicProcedure.input(z.object({
        email: z.string().trim().email(),
        password: z.string().trim().min(8).max(128)
    })).mutation(async ({ input, ctx }) => {
        const credUser = await ctx.db.user.findUnique({
            where: { email: input.email },
            select: { id: true, password: true }
        })
        if (credUser !== null) {
            throw new TRPCError({ code: "CONFLICT", message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(input.password, 5)
        const createdUser = await ctx.db.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                isStoreOwner: false
            },
            select: { id: true }
        })
        // create user
        const token = jwt.sign({
            email: input.email,
            sub: createdUser.id,
            isStoreOwner: false,
        }, 'jwtsecret')

        return { token }
    }),

    becomeStoreOwner: protectedProcedure.mutation(async ({ ctx }) => {
        await ctx.db.user.update({
            where: {
                id: ctx.user.sub
            },
            data: {
                isStoreOwner: { set: true },
            }
        })
    })
})