const path = require("path");

console.log(process.env.NODE_ENV)

module.exports = {
  mode: "production",
  entry: {"bundle":"./src/index.ts", "mocking":"./src/mocking.ts"},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'webpack-preprocessor-loader',
            options: {
              directives: {
                ENV: process.env.NODE_ENV,
              },
            }
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "stepByStep",
  },
};
