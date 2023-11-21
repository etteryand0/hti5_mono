"use client";

import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// eslint-disable-next-line camelcase
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "api";
import superjson from 'superjson'
import { getUrl } from "./shared";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
    children: React.ReactNode;
    headers: Headers;
}) {
    const queryClient = useMemo(() => new QueryClient(), []);

    const trpcClient = useMemo(() =>
        api.createClient({
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env['NODE_ENV'] === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                unstable_httpBatchStreamLink({
                    url: getUrl(),
                    headers() {
                        const headers = new Map(props.headers);
                        headers.set("x-trpc-source", "nextjs-react");
                        return Object.fromEntries(headers);
                    },
                }),
            ],
        }), [props.headers]);

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    );
}
