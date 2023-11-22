/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig
