var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom']
    },
    output: {
        publicPath: path.resolve(__dirname, './build'),
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        library: '[name]_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './build/[name]-manifest.json'),
            name: '[name]_lib',
            context: __dirname,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        })
    ]
};