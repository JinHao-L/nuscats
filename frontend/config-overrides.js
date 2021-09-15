const { addPostcssPlugins, removeModuleScopePlugin, override, babelInclude, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
    removeModuleScopePlugin(),
    addPostcssPlugins([
        require("tailwindcss"), require("autoprefixer")
    ]),
    addWebpackAlias({
        "@api": path.resolve("../api/src")
    }),
    babelInclude([path.resolve("src"), path.resolve("../api")])
);