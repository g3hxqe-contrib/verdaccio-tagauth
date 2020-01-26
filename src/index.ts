import {
  PluginOptions,
  AuthAccessCallback,
  AuthCallback,
  PackageAccess,
  IPluginAuth,
  RemoteUser,
  Logger,
} from '@verdaccio/types';

import { CustomConfig } from '../types/index';

/**
 * Custom Verdaccio Authenticate Plugin.
 */
export default class AuthCustomPlugin implements IPluginAuth<CustomConfig> {
  public logger: Logger;
  private tagConfig: any;
  public constructor(config: CustomConfig, options: PluginOptions<CustomConfig>) {
    this.logger = options.logger;
    this.tagConfig = config.auth.tagauth;
    return this;
  }

  public authenticate(user: string, password: string, cb: AuthCallback): void {
    cb(null, []);
  }

  /**
   * Triggered on each access request
   * @param user
   * @param pkg
   * @param cb
   */
  public allow_access(user: RemoteUser, pkg: PackageAccess, cb: AuthAccessCallback): void {
    cb(null, true);
  }

  /**
   * Triggered on each publish request
   * @param user
   * @param pkg
   * @param cb
   */
  public allow_publish(user: RemoteUser, pkg, cb: AuthAccessCallback): void {
    const hasTagAccess = Object.keys(this.tagConfig).some(tag => {
      const tagConfig = this.tagConfig[pkg.tag];
      return tagConfig && user.groups.includes(tagConfig['publish']);
    });

    cb(null, hasTagAccess);
  }

  public allow_unpublish(user: RemoteUser, pkg, cb: AuthAccessCallback): void {
    const hasTagAccess = Object.keys(this.tagConfig).some(tag => {
      const tagConfig = this.tagConfig[pkg.tag];
      return tagConfig && user.groups.includes(tagConfig['publish'])
    });

    cb(null, hasTagAccess);
  }
}
