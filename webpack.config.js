var path = require("path")

module.exports = {
    target: "node",
    entry: "./src/index.js",
    output: {
        library: "IshikoTestFramework",
        libraryTarget: "umd",
        filename: "ishiko-test-framework.js",
        path: path.resolve(__dirname, "dist")
    },
    externals: {
        fs: {
            commonjs: "fs",
            commonjs2: "fs",
            amd: "fs",
            root: "fs"
        }
    }
}
