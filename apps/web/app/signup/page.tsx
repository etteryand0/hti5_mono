"use client"

import React from 'react'
// import { api } from "../trpc/server"
import { api } from '../../trpc/client'

export default function Home() {
    // const pong = await api.pingpong.ping.useQuery()
    const { mutate } = api.auth.signup.useMutation()

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        mutate({ email: "etteryand@gmail.com", password: "12345678" })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action="submit" onSubmit={onSubmit}>
                <input name="email" type="email" />
                <input name="password" type="password" />
                <button type="submit">submit do signup</button>
            </form>
        </main>
    )
}
