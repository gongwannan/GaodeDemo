/*
 * @Author: gongwannan
 * @Date: 2021-08-31 17:15:56
 * @LastEditTime: 2021-08-31 17:16:10
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \gaodeDemo\src\common\utils.ts
 */
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}
