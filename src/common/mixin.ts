/*
 * @Author: gongwannan
 * @Date: 2021-08-30 09:37:26
 * @LastEditTime: 2021-09-10 16:15:46
 * @LastEditors: gongwannan
 * @Description: In User Settings Edit
 * @FilePath: \GaodeDemo\src\common\mixin.ts
 */
import { isValidKey } from "./utils";
export default {
  methods: {
    /**
     * 对象转化为formData
     * @param {Object} object
     */
    getFormData(object: object) {
      const formData = new FormData();
      Object.keys(object).forEach((key: string) => {
        if (!isValidKey(key, object)) {
          throw Error("invalid sequence");
        }
        const value: any = object[key];
        if (Array.isArray(value)) {
          value.forEach((subValue, i) =>
            formData.append(key + `[${i}]`, subValue)
          );
        } else {
          formData.append(key, object[key]);
        }
      });
      return formData;
    },
    /**
     * @description: 去除对象中value为空(null,undefined,'')的属性
     * @param {object}
     * @return {object}
     */
    cleanObject: (object: object) => {
      const isVoid = (value: any) =>
        value === undefined || value === null || value === "";
      if (!object) {
        return {};
      }
      const result = {
        ...object,
      };
      Object.keys(result).forEach((key) => {
        const value = result[key as keyof typeof result];
        if (isVoid(value)) {
          delete result[key as keyof typeof result];
        }
      });
      return result;
    },
    /**
     * @description: 防抖处理函数
     * @param func 需要防抖的函数
     * @param wait 等待时间
     * @param immediate 是否立即调用
     * @return function 返回一个处理后的函数
     */
    debounce(
      func: () => any = console.log,
      wait: number = 50,
      immediate: boolean = false
    ) {
      let timer: number | null, context: object | null, args: any;
      const later = () =>
        setTimeout(() => {
          timer = null;
          if (!immediate) {
            func.apply(context, args);
            context = args = null;
          }
        }, wait);

      return function (...params: []) {
        if (!timer) {
          timer = later();
          if (immediate) {
            func.apply(this, params);
          } else {
            context = this;
            args = params;
          }
        } else {
          clearTimeout(timer);
          timer = later();
        }
      };
    },
    /**
     * @description: 简单的防抖处理函数
     * @param {function} func需要防抖的函数
     * @param {number} wait等待时间
     * @return {function} 处理后的函数
     */
    debounceSimple(func: () => any, wait: number) {
      let timer: number;
      return function (...params: []) {
        if (!timer) {
          timer = setTimeout(() => {
            func.apply(this, params);
          }, wait);
        } else {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, params);
          }, wait);
        }
      };
    },
    throttleSimple(fn: () => any, time: number) {
      let task: unknown;
      return function (...params: []) {
        if (!task) {
          task = setTimeout(() => {
            task = null;
            fn.apply(this, params);
          });
        }
      };
    },
  },
};
