const { addPostcssPlugins, removeModuleScopePlugin, override, babelInclude } = require("customize-cra");
const path = require("path");

module.exports = override(
    removeModuleScopePlugin(),
    addPostcssPlugins([
        require("tailwindcss"), require("autoprefixer")
    ]),
    babelInclude([path.resolve("src"), path.resolve("../backend")])
);