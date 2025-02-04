const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', {runtime: 'automatic'}],
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({REACT_APP_API_BASE_URL: 'http://localhost:4001'})
        })
    ],
    devServer: {
        historyApiFallback: true, // Redirect unknown routes to index.html
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        compress: true, // Enable gzip compression
        port: 3000, // The port your app runs on
        hot: true // Enable hot module replacement
    }
};
