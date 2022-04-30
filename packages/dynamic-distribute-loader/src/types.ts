export type TResoureAjaxFn = (namespace: string, name: string) => Promise<string>

export interface IDynamicOptions {
  ajax: TResoureAjaxFn;
}

export interface IModuleOptions {
  fetchUrl: string;
  namespace: string;
  module: string;
}