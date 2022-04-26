export interface IDynamicPluginConfig {
  /** 当前模块的命名空间 */
  namespace: string;
  /** 入口配置 */
  entry?: {
    path: string;
    name?: string;
  },
  output?: string;
}