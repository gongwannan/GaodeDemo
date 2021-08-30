/*
 * @Author: your name
 * @Date: 2021-08-30 09:37:26
 * @LastEditTime: 2021-08-30 10:17:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \gaodeDemo\src\common\mixin.js
 */
export default {
    methods: {
        /**
         * 对象转化为formData
         * @param {Object} object
         */
        getFormData(object) {
            const formData = new FormData()
            Object.keys(object).forEach(key => {
                const value = object[key]
                if (Array.isArray(value)) {
                    value.forEach((subValue, i) =>
                        formData.append(key + `[${i}]`, subValue)
                    )
                } else {
                    formData.append(key, object[key])
                }
            })
            return formData
        },
        /**
         * @description: 去除对象中value为空(null,undefined,'')的属性
         * @param {object}
         * @return {object}
         */
        cleanObject: (object) => {
            const isVoid = (value) =>
                value === undefined || value === null || value === "";
            if (!object) {
                return {};
            }
            const result = {
                ...object
            };
            Object.keys(result).forEach((key) => {
                const value = result[key];
                if (isVoid(value)) {
                    delete result[key];
                }
            });
            return result;
        }
    },
}