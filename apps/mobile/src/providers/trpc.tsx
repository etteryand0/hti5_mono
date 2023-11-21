import React, { useMemo } from 'react';
import superjson from 'superjson'
import type { AppRouter } from 'api';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink, loggerLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const api = createTRPCReact<AppRouter>();

const getUrl = (): string => {
    if (process.env.NODE_ENV === 'development') {
        return `http://localhost:${process.env.PORT ?? 3000}/api/trpc`
    }
    if (process.env.API_URL) {
        return process.env.API_URL
    }
    throw new Error("React-antive no API URL in production")
}

const TRPCProvider = ({ children }: React.PropsWithChildren) => {
    const queryClient = useMemo(() => new QueryClient(), []);

    const trpcClient = useMemo(() =>
        api.createClient({
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env.NODE_ENV === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                httpBatchLink({
                    url: getUrl(),
                    headers() {
                        return {
                            "x-trpc-source": "mobile"
                        }
                    }
                })
            ],
        }), []);

    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </api.Provider>
    )
}

export default TRPCProvider;
