const path = require("path");

module.exports = {
    entry: "./public/js/index.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'public/dist'),
    }
}