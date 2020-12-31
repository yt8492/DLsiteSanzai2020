import { Configuration } from 'webpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const config: Configuration = {
    entry: {
        background: path.join(__dirname, 'src', 'background.ts'),
        popup: path.join(__dirname, 'src', 'popup.ts'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: '.' }
            ]
        })
    ]
}

export default config
