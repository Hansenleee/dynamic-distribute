import { merge } from 'lodash';
import fs from 'fs';
import path from 'path';
import { DEFAULT_BUILD_CONFIG } from './constants';
import { IDynamicPluginConfig } from './types';

// 合并配置
export function extendsConfig(config: IDynamicPluginConfig): Required<IDynamicPluginConfig> {
  return merge(config, DEFAULT_BUILD_CONFIG) as Required<IDynamicPluginConfig>;
}

/**
 * 遍历文件夹
 */
export function walkDir(dir: string, callback: Function) {
  const files = fs.readdirSync(dir, {}) as string[];

  files.forEach((file: string) => {
    const absolutePath = path.join(dir, file);
    const stat = fs.statSync(absolutePath);

    if (stat.isDirectory()) {
      callback(file, absolutePath);
    }
  })
}