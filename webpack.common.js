const path = require('path');
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', filename: 'main.bundle.js',
        library: 'checkPhoto',
        libraryTarget: 'window',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ["babel-loader"]
            },
        ]
    },
};
console.warn(process.env.NODE_ENV);
