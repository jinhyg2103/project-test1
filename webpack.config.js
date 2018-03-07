const path = require('path');

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.css'],
    },
    // 가장 처음 읽을 스크립트파일
    // 여기서부터 import 되어있는 다른 스크립트를 불러온다.
    entry: {
        RecordFoundation: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, '/src/RecordFoundation/client.js'),
        ],
    },

    // 파일을 합치고 ./public/bundle.js 에 저장한다.
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name]/bundle.js',
    },

    // ES6 문법과 JSX 문법을 사용한다
    module: {
        rules: [
            /*{
                enforce: 'pre',
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader',
            },*/
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', { modules: false }], 'react'],
                    plugins: ['react-hot-loader/babel'],
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                ],
            },
        ],
    },
};
