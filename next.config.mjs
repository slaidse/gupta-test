/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        
        // Add path aliases
        config.resolve.alias = {
            ...config.resolve.alias,
            '@styles': new URL('./styles', import.meta.url).pathname,
            '@components': new URL('./components', import.meta.url).pathname,
            '@utils': new URL('./utils', import.meta.url).pathname,
            '@lib': new URL('./lib', import.meta.url).pathname,
            '@hooks': new URL('./hooks', import.meta.url).pathname
        };
        
        return config;
    },
};

export default nextConfig;