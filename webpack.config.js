var path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    library: "IshikoTestFramework",
    libraryTarget: "umd",
    filename: "ishiko-test-framework.js",
    path: path.resolve(__dirname, "dist")
  }
}
