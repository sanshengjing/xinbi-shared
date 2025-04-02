export declare function InjectConfig(): PropertyDecorator & ParameterDecorator;
export declare function ConfigValue(key: string, defaultValue?: any): (target: any, propertyKey: string) => void;
