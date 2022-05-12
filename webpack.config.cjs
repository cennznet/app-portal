// Copyright 2017-2022 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base.cjs");

const context = __dirname;
const hasPublic = fs.existsSync(path.join(context, "src/public"));

module.exports = merge(baseConfig(context), {
	devtool: process.env.BUILD_ANALYZE ? "source-map" : false,
	plugins: [
		new HtmlWebpackPlugin({
			PAGE_TITLE: "CENNZnet Portal",
			inject: true,
			template: path.join(context, `${hasPublic ? "src/public/" : ""}index.html`),
		}),
	],
});
