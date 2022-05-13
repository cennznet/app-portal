// Copyright 2017-2022 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const fs = require("fs");
const path = require("path");
const typescript = require("typescript");

const findPackages = require("./polkadot/scripts/findPackages.cjs");

function transform(file, enc, done) {
	const { ext } = path.parse(file.path);

	if (ext === ".tsx") {
		const { outputText } = typescript.transpileModule(
			fs.readFileSync(file.path, enc),
			{
				compilerOptions: { target: "es2018" },
				fileName: path.basename(file.path),
			}
		);

		this.parser.parseFuncFromString(outputText, (key, options) => {
			options.defaultValue = key;

			if (process.platform !== "win32") {
				options.ns = /polkadot\/packages\/(.*?)\/src/g
					.exec(file.path)[1]
					.replace("page-", "app-");
			} else {
				options.ns = /polkadot\/packages\\(.*?)\\src/g
					.exec(file.path)[1]
					.replace("page-", "app-");
			}

			this.parser.set(key, options);
		});
	}

	done();
}

module.exports = {
	input: [
		"polkadot/packages/*/src/**/*.{ts,tsx}",
		// Use ! to filter out files or directories
		"!polkadot/packages/*/src/**/*.spec.{ts,tsx}",
		"!polkadot/packages/*/src/i18n/**",
		"!**/node_modules/**",
	],
	options: {
		debug: true,
		defaultLng: "en",
		func: {
			extensions: [".tsx", ".ts"],
			list: ["t", "i18next.t", "i18n.t"],
		},
		keySeparator: false, // key separator
		lngs: ["en"],
		ns: findPackages().map(({ dir }) => dir.replace("page-", "app-")),
		nsSeparator: false, // namespace separator
		resource: {
			jsonIndent: 2,
			lineEnding: "\n",
			loadPath: "polkadot/packages/apps/public/locales/{{lng}}/{{ns}}.json",
			savePath: "polkadot/packages/apps/public/locales/{{lng}}/{{ns}}.json",
		},
		trans: {
			component: "Trans",
		},
	},
	output: "./",
	transform,
};
