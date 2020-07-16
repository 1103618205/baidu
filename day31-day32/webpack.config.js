const path=require('path')
const webpack=require('webpack')
const HtmlWebpakcPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const htmlplugin=new require('html-webpack-plugin');
module.exports={
    // mode:"production",
    entry:__dirname+"/app/app.js",
    devtool:'source-map',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
    },

    devServer:{
        contentBase:"./dist",
        historyApiFallback:true,
        inline:true,
        hot:true,
        port:9090
    },
    module:{
        rules:[
            {
                test:/(\.js)|(\.jsx)$/,
                use:{
                    loader:"babel-loader",
                },
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,//注意这边
                    "css-loader",
                   'postcss-loader'
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename:'[id].css',
            ignoreOrder:true
        }),
        new htmlplugin({//在插件库plugins下
            minify:{
                removeAttributeQuotes:true//去除标点例如 id='x' 打包后为id=x
            },
            hash:true,
            template:__dirname+'/index.html',//打包的html文件路径
            filename:"./index.html"
        })
    ]

}