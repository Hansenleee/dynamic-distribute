/**
 * 基于 webpack chain 的链式配置
 */
import ChainableConfig from 'webpack-chain';
import { LIBRARY_PREFIX } from './constants';
import { IDynamicPluginConfig } from './types';

export interface WebpackChainBuildOptions {
  chain: (fn: (chainableConfig: ChainableConfig) => void) => void;
  config: IDynamicPluginConfig;
}

export class WebpackChainBuild {
  chain!: WebpackChainBuildOptions['chain'];

  config!: WebpackChainBuildOptions['config'];

  constructor(options: WebpackChainBuildOptions) {
    this.chain = options.chain;
    this.config = options.config;
  }

  /**
   * 配置 output
   */
  private configOutput() {
    this.chain(webpackChain => {
      webpackChain.output.library(`${LIBRARY_PREFIX}.${this.config.namespace}`)
    })
  }

  configWebpackchain() {
    this.configOutput();
  }
}