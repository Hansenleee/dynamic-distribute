import { WebpackChainBuild, IDynamicPluginConfig } from 'dynamic-distribute-build';
import type { PluginAPI, ProjectOptions } from '@vue/cli-service';

module.exports = (api: PluginAPI, options: ProjectOptions) => {
  if (process.env.DYNAMIC_DISTRIBUTE) {
    const builder = new WebpackChainBuild({
      chain: api.chainWebpack.bind(api),
      config: ((options.pluginOptions || {}) as { dynamicDistribute: IDynamicPluginConfig }).dynamicDistribute || {},
    });
  
    builder.configWebpackchain();
  }
}