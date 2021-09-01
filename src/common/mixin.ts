/*
 * @Author: gongwannan
 * @Date: 2021-08-30 09:37:26
 * @LastEditTime: 2021-08-31 17:35:58
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
    /**
     * @description: 防抖
     * @param {function} fn
     * @param {number} time
     * @return {*}
     */
    debounce(fn: () => any, time: number) {
      let task: number;
      return function () {
        if (task) {
          clearTimeout(task);
        }
        task = setTimeout(fn.apply(this, arguments), time);
      };
    },
    /**
     * @description: 节流
     * @param {function} fn
     * @param {number} time
     * @return {*}
     */
    throttle(fn: () => any, time: number) {
      let task: unknown;
      return function () {
        if (!task) {
          task = setTimeout(() => {
            task = null;
            fn.apply(this, arguments);
          });
        }
      };
    },
  },
};
