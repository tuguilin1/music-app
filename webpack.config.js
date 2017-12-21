const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV||'dev';
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const config = {
	entry:{
		'index':'./src/js/index.js'
	},
	output:{
		filename:'js/[name].js',
		path:path.resolve(__dirname,'dist'),
		publicPath:'/dist/',
	},
	devServer: {
	  contentBase: path.join(__dirname, "dist"),
	  publicPath:'/dist/',
	  compress: true,
	  port: 9000,
	  hot:true,
	  proxy:{
	  	"/fcg_yqqhomepagerecommend.fcg/*":{
	  		target:'https://c.y.qq.com/musichall/fcgi-bin',
	  		secure: true, // 接受 运行在 https 上的服务
	        changeOrigin: true
	  	}
	  }
	},
	resolve: {
    	extensions: ['.js', '.vue', '.json','.css'],
	    alias: {
	      '@': resolve('src'),
	      'components':resolve('src/components')
	    }
  	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback: 'style-loader',  
                    use:'css-loader' 
				})
			},
			{
	        	test: /\.vue$/,
		        loader: 'vue-loader'
		    },
		    {
		        test: /\.js$/,
		        loader: 'babel-loader',
		        include: [resolve('src'), resolve('test')],
		        query: {
                    presets: ['es2015']
                }
		    },
		    {
		        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: 'imgs/[name].[hash:7].[ext]'
		        }
		    },
		    {
		        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: 'media/[name].[hash:7].[ext]'
		        }
		    },
		    {
		        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: 'fonts/[name].[hash:7].[ext]'
		        }
		    },
			{  
                test: /\.less$/,  
                use: ExtractTextPlugin.extract({  
                    fallback: 'style-loader',  
                    use: [  
                        'css-loader',  
                        'autoprefixer-loader',  
                        'less-loader'  
                    ]  
                })  
            }, 
		]
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin('css/[name].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'js/[name].js'
		}),
		new HtmlWebpackPlugin({
			filename: "index.html", //生成的html存放路径，相对于 path
			template:'index.html',
			inject: true, //允许插件修改哪些内容，包括head与body
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: false, //删除空白符与换行符
				//removeAttributeQuotes: true
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'inline-source-map',
}

//if('dev'=== WEBPACK_ENV){
//	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
//}

module.exports = config;