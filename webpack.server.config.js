const path = require('path');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals({
        modulesDir: __dirname,
    })],
    entry: {
        Jivida: [
            'react-hot-loader/patch',
            path.join(__dirname, '/src/Jivida/serverRender.js'),
        ],
        Admin: [
            'react-hot-loader/patch',
            path.join(__dirname, '/src/Admin/serverRender.js'),
        ],
    },
    output: {
        path: path.join(__dirname, 'src'),
        filename: '[name]/serverRender.bundle.js',
        libraryTarget: 'commonjs2', // node 에서 불러올 수 있도록, commonjs2 스타일로 번들링 합니다
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.css', '.less', '.handlebars'],
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', { modules: false }], 'react'],
                },
            },
            {
                test: /\.css$/,
                loader: 'css-loader/locals?modules',
            },
            {
                test: /\.json$/,
                loaders: 'json-loader',
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'file-loader',
            },

            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
    ],
};
