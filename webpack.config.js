const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "webpack-preprocessor-loader",
            options: {
              params: {
				ENV: process.env.NODE_ENV,
                pm: false,
              },
            },
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
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "stepByStep",
  },
};
