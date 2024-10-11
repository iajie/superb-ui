import request from "@/utils/request"

/**
 * 分页查询
 * @param params 
 * @returns 
 */
export const pageQuery = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/dict/type/pageQuery`, {
        method: 'POST',
        data: params
    });
}

/**
 * 字典查询
 * @param params 
 * @returns 
 */
export const dictQuery = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/dict/type/dictQuery`, {
        method: 'POST',
        data: params
    });
}

/**
 * 新增字典类型
 * @param params 
 * @returns 
 */
export const insertType = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/dict/type/insert`, {
        method: 'POST',
        data: params
    });
}

/**
 * 修改数据
 * @param params 
 * @returns 
 */
export const updateType = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/dict/type/update`, {
        method: 'POST',
        data: params
    });
}

/**
 * 新增字典
 * @param params 
 * @returns 
 */
export const insert = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/dict/insert`, {
        method: 'POST',
        data: params
    });
}

/**
 * 修改数据
 * @param params 
 * @returns 
 */
export const update = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/dict/update`, {
        method: 'POST',
        data: params
    });
}