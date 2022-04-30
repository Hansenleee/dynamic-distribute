import ResourceLoader from './resource';
import { IModuleOptions, IDynamicOptions } from '../types';

export class DynamicLoaderCore {
  resource!: ResourceLoader;

  constructor(options: IDynamicOptions) {
    this.resource = new ResourceLoader({ ajax: options.ajax })
  }

  get global(): any {
    return window;
  }

  /**
   * load module
   */
  getModule(options: IModuleOptions) {
    return this.resource.getResource(options.namespace, options.module)
      .then((resourceUrl) => {
        this.resource.append(resourceUrl).then(() => {
          return this.global[`DYNAMIC_DISTRIBUTE_LIBRARY_${options.namespace}_${options.module}`];
        })
      })
  }
}