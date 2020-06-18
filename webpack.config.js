const path = require("path");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public"),
    },
    module: {
        rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                }, ],
            },
        ],
    },
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "public"),
    },
    node: {
        fs: "empty"
    },
    devtool: 'inline-source-map',
    plugins: [
        new Dotenv()
    ]
};