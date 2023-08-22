export function buildSVGloader() {
    return {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };
}
