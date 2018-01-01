const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        // publicPath: path.resolve(__dirname, './build'),
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    devServer: {
        inline: true,
        port: 3000
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            comments: false,
            compress: {
                warnings: false,
                // drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};