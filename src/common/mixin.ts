/*
 * @Author: gongwannan
 * @Date: 2021-08-30 09:37:26
 * @LastEditTime: 2021-09-03 18:03:57
 * @LastEditors: gongwannan
 * @Description: In User Settings Edit
 * @FilePath: \gaodeDemo\src\common\mixin.ts
 */
import { unknownProp } from "vant/lib/utils";
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
    debounce(
      func: () => any = console.log,
      wait: number = 50,
      immediate: boolean = false
    ) {
      let timer: number | null, context: object | null, args: any;
      const later: object = () =>
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

    throttle(fn: () => any, time: number) {
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
