const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const autoprefixer = require('autoprefixer');


module.exports = {
    mode: "development",
    entry: {
        main: "./index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         postcssOptions: {
                    //             plugins: [
                    //                 "autoprefixer"
                    //             ]
                    //         }
                    //     }
                    // },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ],
            },
            // {
            //     test: /\.html$/i,
            //     loader: "html-loader",
            // },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            // Для webpack @ 5 вы можете использовать синтаксис `...` для расширения существующих минимизаторов (например, `terser-webpack-plugin`), раскомментируйте следующую строку
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: 'main.css'
        }),
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css"
        // }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "")
        },
        port: 3010,
        open: true,
        compress: true,
    },
}