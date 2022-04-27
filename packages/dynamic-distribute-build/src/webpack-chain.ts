/**
 * 基于 webpack chain 的链式配置
 */
import path from 'path';
import ChainableConfig from 'webpack-chain';
import { LIBRARY_PREFIX } from './constants';
import { extendsConfig, walkDir } from './shared';
import { IDynamicPluginConfig } from './types';

export interface WebpackChainBuildOptions {
  chain: (fn: (chainableConfig: ChainableConfig) => void) => void;
  config: IDynamicPluginConfig;
}

export class WebpackChainBuild {
  chain!: WebpackChainBuildOptions['chain'];

  config!: Required<IDynamicPluginConfig>;

  constructor(options: WebpackChainBuildOptions) {
    this.chain = options.chain;
    this.config = extendsConfig(options.config);

    if (!this.config.namespace) {
      console.error('[dynamic-distribute]', 'config dynamicDistribute.namespace missed');
    }
  }

  /**
   * 配置入口
   */
  private configEntry() {
    this.chain(webpackChain => {
      const { entry } = this.config;

      // 清理原有的入口配置
      webpackChain.entryPoints.clear();

      walkDir(entry!.path, (filename: string, filePath: string) => {
        webpackChain
          .entry(filename)
          .add(path.join(filePath, entry.name as string))
          .end();
      });
    });
  }

  /**
   * 配置 output
   */
  private configOutput() {
    this.chain(webpackChain => {
      webpackChain.output
          .filename('[name].[contenthash:8].js')
          .libraryTarget('window')
          .library(`${LIBRARY_PREFIX}_${this.config.namespace}`)
          .end();
    });
  }

  /**
   * optimization 配置
   */
  private configOptimization() {
    this.chain(webpackChain => webpackChain.optimization.splitChunks({}).end());
  }

  /**
   * plugins 配置
   */
  private configPlugins() {
    this.chain(webpackChain => {
      const deletes = ['html', 'preload', 'prefetch', 'copy'];

      deletes.forEach((plugin) => {
        webpackChain.plugins.when(
          webpackChain.plugins.has(plugin),
          () => webpackChain.plugins.delete(plugin)
        );
      })
    })
  }

  configWebpackchain() {
    this.configEntry();
    this.configOutput();
    this.configOptimization();
    this.configPlugins();
  }
}