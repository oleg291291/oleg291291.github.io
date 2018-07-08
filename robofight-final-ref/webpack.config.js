const isProd = (process.env.NODE_ENV === 'production') ? true : false;

console.log('process.env.NODE_ENV === ' + process.env.NODE_ENV);

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { ProvidePlugin } = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');



const config = {
    // Include source maps in development files
    devtool: isProd ? false : '#cheap-module-source-map',

    entry: {
        // Main entry point of our app
        app: resolve(__dirname, 'src', 'index.js'),
    },

    output: {
        // As mentioned before, built files are stored in dist
        path: resolve(__dirname, 'dist'),

        publicPath: isProd ? 'https://oleg291291.github.io/robofight-final-ref/dist/' : '/',

        // We add hash to filename to avoid caching issues
        filename: '[name].[hash].js',
    },

    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
            'jquery': 'jquery/dist/jquery.min.js',
            'jquery-ui/ui/widgets/sortable.js': 'jquery-ui/ui/widgets/sortable.js'



        },
        extensions: ['*', '.js'],
        modules: [
            resolve(__dirname, 'node_modules'),

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
        ],
    },

    plugins: [

        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
        }),
        new HtmlWebpackPlugin({
            title: 'Robogame',
            template: resolve(__dirname, 'src', 'html', 'index.ejs'),
        }),
        new ExtractTextPlugin({
            filename: 'style.[hash].css',
            disable: !isProd,
        }),
    ],
}

if (!isProd) {
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