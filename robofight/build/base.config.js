// Define this constant for easier usage
const isProd = process.env.NODE_ENV === 'production';

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { ProvidePlugin } = require('webpack');

// For production
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');




const config = {
    // Include source maps in development files
    devtool: isProd ? false : '#cheap-module-source-map',

    entry: {
        // Main entry point of our app
        app: resolve(__dirname, '..', 'src', 'index.js'),
    },

    output: {
        // As mentioned before, built files are stored in dist
        path: resolve(__dirname, '..', 'dist'),

        // In our case we serve assets directly from root
        publicPath: '/',

        // We add hash to filename to avoid caching issues
        filename: '[name].[hash].js',
    },

    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
            'jquery': 'jquery/dist/jquery.min.js', // my paste
            "jquery-ui": "jquery-ui-custom/jquery-ui.min.js"  //my paste



        },
        extensions: ['*', '.js'],
        modules: [
            resolve(__dirname, '..', 'node_modules'),

        ],
    },

    module: {
        rules: [
            {
                test: /\.handlebars$/,
                loader: 'text-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.scss|\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            },
        ],
    },

    plugins: [

        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "$": "jquery",//my paste
            "jQuery": "jquery",//my paste
            "window.jQuery": "jquery", //my paste
            Popper: 'popper.js',
        }),
        new HtmlWebpackPlugin({
            title: 'Robogame',
            template: resolve(__dirname, '..', 'src', 'html', 'index.ejs'),
        }),
        new ExtractTextPlugin({
            filename: 'style.[hash].css',
            disable: !isProd,
        }),
        // For production
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

        }),
    ],
}

if (!isProd) {
    config.devServer = {
        contentBase: resolve(__dirname, '..', 'static'),
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
    }
}

module.exports = config