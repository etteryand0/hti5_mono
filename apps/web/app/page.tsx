"use client"

import React from 'react'
// import { api } from "../trpc/server"
import { api } from '../trpc/client'

export default function Home(props: any) {
  // const pong = await api.pingpong.ping.useQuery()
  const { mutate } = api.auth.login.useMutation()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({ email: "etteryand@gmail.com", password: "12345678" }, {
      onSuccess: ({ token }) => {
        console.log(token, props)
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>hello</div>
      <div>ping</div>

      <h2>Login</h2>
      <form action="submit" onSubmit={onSubmit}>
        <input name="email" type="email" />
        <input name="password" type="password" />
        <button type="submit">submit do login</button>
      </form>
    </main>
  )
}
