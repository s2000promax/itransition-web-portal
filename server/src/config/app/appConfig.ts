import * as process from 'process';

export default () => ({
    port: parseInt(process.env.VERCEL_PORT, 10) || 8002,
    origins: [
        process.env.VERCEL_REMOTE_ORIGIN,
        process.env.VERCEL_LOCAL_ORIGIN,
        process.env.VERCEL_AWS_ORIGIN,
    ],
    serverDomain:
        process.env.VERCEL_NODE_ENV !== 'production'
            ? process.env.VERCEL_LOCAL_SERVER_DOMAIN
            : process.env.VERCEL_DEPLOY_SERVER_DOMAIN,
    clientDomain:
        process.env.VERCEL_NODE_ENV !== 'production'
            ? process.env.VERCEL_LOCAL_ORIGIN
            : process.env.VERCEL_REMOTE_ORIGIN,
});
