const path = require("path");
const { merge } = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const common = require("./webpack.common");

const configReader = require('yml-config-reader');

const config = configReader.getByFiles('../../.app.yml')

const vendors = [
  "react",
  "react-dom",
  "react-router-dom",
];
module.exports = merge(common, {
  entry: {
    vendor: vendors,
    index: {
      import: path.resolve(__dirname, "../../src/index.tsx"),
      dependOn: "vendor",
    },
  },
  mode: "production",
  output: {
    filename: "js/[contenthash].js",
    chunkFilename: "chunk/[chunkhash].js",
    path: path.resolve(__dirname, "../../dist"),
  },
  plugins: [
    // 针对html文件压缩 聊胜于无
    new HTMLWebpackPlugin({
      cache: false,
      filename: "index.html",
      title: config.title.prod,
      template: path.resolve(__dirname, "../../public/index.html"),
      favicon: path.resolve(__dirname, '../../src/common/assets/favicon/favicon.ico'),
      minify: {
        collapseWhitespace: true, // 折叠空白区域
        preserveLineBreaks: false,
        minifyCSS: true, // 压缩文内css
        minifyJS: true, // 压缩文内js
        removeComments: true, // 移除注释
      },
    }),
    // 启动gzip
    new CompressionPlugin({
      test: /.js$/, // 还可以扩展其他文件类型
    }),
    // 打包分析 如果需要的时候移除注释就好了
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
