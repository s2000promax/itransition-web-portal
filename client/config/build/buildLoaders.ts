import type webpack from 'webpack';
import type { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSVGloader } from './loaders/buildSVGloader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    // If we don't use typeScript, should to install babel-loader
    // const typeScriptLoader = {
    //   test: /\.tsx?$/,
    //   use: 'ts-loader',
    //   exclude: /node_modules/,
    // };

    const styleLoader = buildCssLoader(isDev);

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const svgLoader = buildSVGloader();

    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typeScriptLoader,
        styleLoader,
    ];
}
