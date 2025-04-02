import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export function InjectConfig() {
  return Inject(ConfigService);
}

export function ConfigValue(key: string, defaultValue?: any) {
  return function (target: any, propertyKey: string) {
    let value: any;
    let configService: ConfigService;

    Object.defineProperty(target, propertyKey, {
      get() {
        // 延迟获取 ConfigService 实例
        if (!configService) {
          configService = (this as any).configService;
        }
        // 延迟获取配置值
        if (configService && value === undefined) {
          value = configService.get(key, defaultValue);
        }
        console.log('value', value);
        return value;
      },
      enumerable: true,
      configurable: true
    });

    // 注入 ConfigService
    InjectConfig()(target, 'configService');
  };
}
