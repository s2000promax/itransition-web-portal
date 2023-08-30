import * as process from 'process';

export default () => ({
    port: parseInt(process.env.VERCEL_PORT, 10) || 8002,
    origins: [
        process.env.VERCEL_REMOTE_ORIGIN,
        process.env.VERCEL_LOCAL_ORIGIN,
    ],
});
