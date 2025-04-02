import { Injectable } from '@nestjs/common';

@Injectable()
export class StringService {
  // 字符串脱敏
  static desensitizeString(str: string, len: number = 4) {
    const strLen = str.length;
    return '****' + str.substring(strLen, strLen - len);
  }
}
