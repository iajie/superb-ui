import request from "@/utils/request"

/**
 * 新增数据
 * @param params 
 * @returns 
 */
export const insert = async (params: any) => {
    return request(`/api/${global.SYSTEM}/organization/insert`, {
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
    return request(`/api/${global.SYSTEM}/organization/update`, {
        method: 'POST',
        data: params
    });
}

/**
 * 删除数据-假删除
 * @param id 
 * @returns 
 */
export const remove = async (id: string) => {
    return request(`/api/${global.SYSTEM}/organization/remove/${id}`);
}

/**
 * 根据id获取详情信息
 * @returns 
 */
export const detailsById = async (id: string) => {
    return request(`/api/${global.SYSTEM}/organization/info/${id}`);
}

/**
 * 回收站-假删除数据
 * @returns 
 */
export const delQuery = async () => {
    return request(`/api/${global.SYSTEM}/organization/delQuery`);
}

/**
 * 数据恢复-需为回收站内的数据，直接掉该接口无法正常恢复
 * @param id 回收站数据id集合
 * @returns 
 */
export const recovery = async (id: string[]) => {
    return request(`/api/${global.SYSTEM}/organization/recovery`, {
        method: 'POST',
        data: { id }
    });
}

/**
 * 彻底删除-需为回收站内的数据，直接掉该接口无法正常删除
 * @param id 回收站数据id集合
 * @returns 
 */
export const realDelete = async (id: string[]) => {
    return request(`/api/${global.SYSTEM}/organization/delete`, {
        method: 'POST',
        data: { id }
    });
}