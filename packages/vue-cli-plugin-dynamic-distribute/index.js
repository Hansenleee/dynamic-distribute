"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamic_distribute_build_1 = require("dynamic-distribute-build");
module.exports = (api, options) => {
    if (process.env.DYNAMIC_DISTRIBUTE) {
        const builder = new dynamic_distribute_build_1.WebpackChainBuild({
            chain: api.chainWebpack.bind(api),
            config: (options.pluginOptions || {}).dynamicDistribute || {},
        });
        builder.configWebpackchain();
    }
};
