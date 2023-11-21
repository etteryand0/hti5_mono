"use client"
import { api } from "../../trpc/client"

const TestPage = () => {
    const { isLoading, data } = api.pingpong.ping.useQuery()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {isLoading ? "loading" : JSON.stringify(data)}
        </main>
    )
}

export default TestPage
