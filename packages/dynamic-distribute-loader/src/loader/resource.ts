import { appendScript } from '../shared';
import { TResoureAjaxFn } from '../types';

export interface IResourceOptions {
  ajax: TResoureAjaxFn
}

export default class ResourceLoader {
  private ajax!: TResoureAjaxFn;

  private cacahMap: Record<string, Record<string, string | Promise<string>>>;

  private moduleMap: Record<string, boolean>;

  constructor(options: IResourceOptions) {
    this.ajax = options.ajax;
    this.cacahMap = {};
    this.moduleMap = {};
  }

  /**
   * get reousrce
   */
  getResource(namespace: string, name: string) {
    if (this.cacahMap[namespace]?.[name]) {
      return Promise.resolve(this.cacahMap[namespace][name]);
    }

    if (!this.cacahMap[namespace]) {
      this.cacahMap[namespace] = {};
    }

    this.cacahMap[namespace][name] = new Promise<string>((resolve, reject) => {
      return this.ajax(namespace, name)
        .then((result) => {
          this.cacahMap[namespace][name] = result;

          resolve(result);
        })
        .catch(reject);
    });

    return this.cacahMap[namespace][name] as Promise<string>;
  }

  /**
   * append resource module
   */
  append(resourceUrl: string) {
    if (this.moduleMap[resourceUrl] !== undefined) {
      return Promise.resolve(this.moduleMap[resourceUrl]);
    }

    if (/\.js$/.test(resourceUrl)) {
      return appendScript(resourceUrl).then(() => this.moduleMap[resourceUrl] = true);
    }

    // CSS file
    return Promise.resolve();
  }
}