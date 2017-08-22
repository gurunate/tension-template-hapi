'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'bootstrap',
        'bootstrap/dist/css/bootstrap.css',
        // 'bootstrap/dist/css/bootstrap-theme.css',
        'bootswatch/simplex/bootstrap.min.css',
        './client/css/styles.scss',
        './client/js/main.js',
    ],
    output: {
        path: path.resolve(__dirname, '../public'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                loader: 'file-loader',
                options: {
                    name: './img/[name].[ext]?[hash]'
                }
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                include: /(client\/font|node_modules)/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.woff2$/,
                include: /(client\/font|node_modules)/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                include: /(client\/font|node_modules)/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            mimetype: 'application/octet-stream',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                include: /(client\/font|node_modules)/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            mimetype: 'application/octet-stream',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: /(client\/font|node_modules)/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            mimetype: 'image/svg+xml',
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                include: /(client\/font|node_modules)/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer()]
            }
        }),
        new ExtractTextPlugin('/css/styles.css')
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
