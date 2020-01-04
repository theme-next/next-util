const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');

module.exports = function(hexo, pluginDir) {
  this.hexo = hexo;
  this.pluginDir = pluginDir;
  this.getFilePath = function(file) {
    return this.pluginDir ? path.resolve(this.pluginDir, file) : file;
  };
  this.getFileContent = function(file) {
    return fs.readFileSync(this.getFilePath(file), 'utf8');
  };
  this.defaultConfigFile = function(key, file) {
    let defaultConfig = file ? yaml.safeLoad(this.getFileContent(file)) : {};
    this.hexo.config[key] = deepmerge(defaultConfig[key], this.hexo.theme.config[key], this.hexo.config[key]);
    return this.hexo.config[key];
  };
};
