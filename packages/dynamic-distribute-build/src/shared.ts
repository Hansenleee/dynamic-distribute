import { DEFAULT_BUILD_CONFIG } from './constants';
import { IDynamicPluginConfig } from './types';
import { merge } from 'lodash';

export function extendsConfig(config: IDynamicPluginConfig): Required<IDynamicPluginConfig> {
  return merge(config, DEFAULT_BUILD_CONFIG) as Required<IDynamicPluginConfig>;
}