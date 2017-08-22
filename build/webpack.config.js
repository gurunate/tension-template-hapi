'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'bootstrap',
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap/dist/css/bootstrap-theme.css',
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
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // {{#sass}}
                        //     // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        //     // the "scss" and "sass" values for the lang attribute to the right configs here.
                        //     // other preprocessors should work out of the box, no loader config like this necessary.
                        //     'scss': 'vue-style-loader!css-loader!sass-loader',
                        //         'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                        // {{/sass}}
                    }
                    // other vue-loader options go here
                }
            }, {
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
                test: /\.(png|jpg|gif|svg)$/,
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
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
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
    // http://vue-loader.vuejs.org/en/workflow/production.html
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
