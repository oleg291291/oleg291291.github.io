const path = require('path');
const { resolve } = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//prod
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//dev
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isProduction = !isDevelopment;

console.log('isDevelopment === ' + isDevelopment)




const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        open: false,
        hot: true,
        contentBase: path.join(__dirname, "src"),
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/',
                        useRelativePath: true,
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                    }
                },

            ]
        }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: "[name].[hash]-styles.css",
            chunkFilename: "[id].css"
        }),

        new HtmlWebpackPlugin({
            title: 'Woodshape',
            template: path.resolve(__dirname, 'src', 'html', 'index.html'),
            minify: !isDevelopment && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: false
            },

        }),

    ],
};


if (isDevelopment) {
    // for hot reload support!
    config.module.rules.push({
        test: /\.(sass|scss|css)$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    module: true
                }
            },
            "sass-loader"
        ]
    })
}
else {
    config.module.rules.push({
        /////////////
        //for production only! (hot reload not working with this)
        ///////////////
        test: /\.(sass|scss|css)$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    sourceMap: isDevelopment,
                    minimize: !isDevelopment
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    autoprefixer: {
                        browsers: ["last 2 versions"]
                    },
                    sourceMap: isDevelopment,
                    plugins: () => [
                        autoprefixer
                    ]
                },
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: isDevelopment
                }
            }

        ]
    })
}
if (!isProduction) {
    console.log('devServer config enabled...')
    config.devServer = {
        contentBase: resolve(__dirname, 'static'),
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
    }
}
else {
    console.log('UglifyJsPlugin enabled...')
    config.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions: {
                comments: false,
                beautify: false,
                compress: {
                    sequences: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    warnings: false,
                    drop_console: true,
                    unsafe: true
                }
            }

        })

    )
}


module.exports = config
