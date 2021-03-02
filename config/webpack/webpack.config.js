const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
const configReader = require('yml-config-reader');

const config = configReader.getByFiles('../../.app.yml');

// 根据环境加载不同配置
module.exports = config.silverwing.DEV ? prodConfig : devConfig;
