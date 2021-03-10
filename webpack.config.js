const path = require('path');

module.exports = {
	mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: [
					{
						loader: 'webpack-preprocessor-loader',
						options: {
							params: {
      							pm: false,
								dev: true,
    						},
						},
					},
					{
						loader: 'ts-loader'
					},

				],
                exclude: /node_modules/,
		}],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
		library: "stepByStep"
    },

};