module.exports = {
    context: __dirname + '/src',
    // entry: './index.jsx',
    entry: {
      javascript: "./index.jsx"
    },
    output: {
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        path: __dirname + '/dist',
        publicPath: 'http://localhost:8090/assets'
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
