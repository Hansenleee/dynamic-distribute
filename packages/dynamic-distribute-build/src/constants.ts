import { IDynamicPluginConfig } from './types';
import path from 'path';

// libraray 前缀
export const LIBRARY_PREFIX = 'DYNAMIC_DISTRIBUTE_LIBRARY';

// 默认配置
export const DEFAULT_BUILD_CONFIG: Partial<IDynamicPluginConfig> = {
  entry: {
    path: path.join(process.cwd(), 'src', 'dynamic-distribute'),
    name: 'index'
  },
  output: path.join(process.cwd(), 'dist'),
}