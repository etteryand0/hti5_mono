import superjson from "superjson";

export const transformer = superjson;

function getBaseUrl() {
    if (typeof window !== "undefined") return "";
    return `http://localhost:${process.env['PORT'] ?? 3000}`;
}
  
export function getUrl() {
    return `${getBaseUrl()}/api/trpc`;
}