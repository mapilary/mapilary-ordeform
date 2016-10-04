module.exports = {
    context: __dirname + '/src',
    // entry: './index.jsx',
    entry: {
      javascript: "./index.jsx"
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist', // for build
        publicPath: 'http://localhost:8080/'
    },
    module: {
        loaders: [
            { test: /\.jsx$/,loader: 'jsx-loader?insertPragma=React.DOM&harmony' },
            { test: /\.html$/, loader: "file?name=[name].[ext]" },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': '$'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
