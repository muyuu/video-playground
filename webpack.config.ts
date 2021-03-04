import fs from 'fs';
import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    context: path.join(__dirname, 'src'),
    entry: './main.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            crypto: false,
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        host: "localhost.anticyb.org",
        port: 9999,
        https: {
            key: fs.readFileSync(`${path.join(__dirname, 'cert')}/privkey.pem`),
            cert: fs.readFileSync(`${path.join(__dirname, 'cert')}/cert.pem`),
        },
    },
};

export default config;
