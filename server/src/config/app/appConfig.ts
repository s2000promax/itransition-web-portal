import * as process from 'process';

export default () => ({
    port: parseInt(process.env.VERCEL_PORT, 10) || 8002,
    origins: [
        process.env.VERCEL_REMOTE_ORIGIN,
        process.env.VERCEL_LOCAL_ORIGIN,
        process.env.VERCEL_AWS_ORIGIN,
        process.env.VERCEL_REMOTE_LOCAL_2,
        process.env.VERCEL_REMOTE_LOCAL_3,
        process.env.VERCEL_REMOTE_ORIGIN_2,
        process.env.VERCEL_REMOTE_ORIGIN_3,
        process.env.VERCEL_REMOTE_ORIGIN_4,
        process.env.VERCEL_REMOTE_ORIGIN_5,
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
