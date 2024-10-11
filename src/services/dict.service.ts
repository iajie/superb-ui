import request from "@/utils/request";

/**
 * 普通字典翻译查询
 * @param params 
 * @returns 
 */
export const dictTranslate = async (dictCode: string) => {
    return request(`/api/${global.ALLOCATION}/dict/translate/${dictCode}`);
}

/**
 * 树形字典翻译查询
 * @param params 
 * @returns 
 */
export const treeDictTranslate = async (dictCode: string) => {
    return request(`/api/${global.ALLOCATION}/dict/translate/tree/${dictCode}`);
}