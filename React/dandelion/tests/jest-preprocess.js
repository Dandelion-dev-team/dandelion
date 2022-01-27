const babelOptions = {
  presets: ["@babel/preset-env", "@babel/preset-react", "babel-preset-gatsby"],
}

module.exports = require("babel-jest").default.createTransformer(babelOptions)