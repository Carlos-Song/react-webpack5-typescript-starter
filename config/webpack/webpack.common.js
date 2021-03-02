const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const publicPath = process.env.NODE_ENV === "production" ? "" : "/";
const SCOPE_NAME = "[path][name]__[local]";

module.exports = {
  entry: path.resolve(
    __dirname,
    path.resolve(__dirname, "../../src/index.tsx")
  ),
  target: "web",
  resolve: {
    modules: [path.resolve(__dirname, "../../"), "node_modules"],
    alias: {},
    extensions: [".tsx", ".ts", ".js", ".scss", ".css"],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../../tsconfig.json"),
      }),
    ],
    fallback: {
      util: false,
    },
  },
  module: {
    rules: [
      // babel
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              sourceType: "unambiguous",
              presets: [
                "@babel/preset-env",
                "@babel/preset-react", // 编译react
                "@babel/preset-typescript", // 编译ts
              ],
              plugins: [
                [
                  "module-resolver", // 模块处理
                  {
                    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"], // 自动填充后缀，例如写'./index' 就会按着数组顺序去路径下找对应的文件
                    alias: {}, // 这里可以申明一些路径别名
                  },
                ],
                ["@babel/plugin-transform-runtime"],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                [
                  "@babel/plugin-proposal-decorators", // 支持装饰器
                  {
                    legacy: true,
                  },
                ],
                "@babel/plugin-syntax-dynamic-import", // 动态导入
                "@babel/plugin-proposal-optional-chaining", // 这两个是用来处理 a && a.b => a.?b的 避免多层对象写的过于复杂
              ],
            },
          },
        ],
      },
      // 处理css
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          // 最新的（5.0.0）postcss需要单独写config文件，下面这种写法会报错，可以使用(v3.0.0)
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: () => [autoprefixer()],  // 浏览器兼容性前缀补全
          //   },
          // },
        ],
      },
      // 处理sass
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: SCOPE_NAME,
              },
              importLoaders: 3,
              sourceMap: false,
            },
          },
          "postcss-loader",
          // 最新的（5.0.0）postcss需要单独写config文件，下面这种写法会报错，可以使用(v3.0.0)
          {
            loader: "sass-loader",
          },
        ],
      },
      // 图片处理
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false, // 不然src会变成[object%20Module]
              emitFile: true,
              limit: 3 * 1024,
              name: "images/[name]__[hash:5].[ext]",
              publicPath: publicPath,
            },
          },
        ],
      },
      // 处理文件
      {
        test: /\.(ttf|mp3|mp4)$/, // 这里只写了字体/mp3/mp4 需要自己添加正则就好
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name]__[hash:5].[ext]",
              publicPath: publicPath,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(), // 进度条
    new FriendlyErrorsWebpackPlugin(), // 报错信息
    new CleanWebpackPlugin({
      // 清除上次编译的内容
      verbose: true, // Write logs to console.
      dry: false,
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
  ],
};
