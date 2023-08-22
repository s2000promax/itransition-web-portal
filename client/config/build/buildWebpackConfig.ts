import { type Configuration } from 'webpack';
import { type BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: {
            main: paths.entry, // "main" can't be indicated
        },
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            // publicPath: './',
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
