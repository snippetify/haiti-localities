const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './index.js',
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        libraryTarget: 'umd',
        library: 'htLocalities',
        filename: 'haiti-localities.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ]
    }
}
