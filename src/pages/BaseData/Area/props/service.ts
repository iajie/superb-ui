import request from "@/utils/request"

/**
 * 新增数据
 * @param params 
 * @returns 
 */
export const insert = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/allocationPosition/insert`, {
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
    return request(`/api/${global.ALLOCATION}/allocationPosition/update`, {
        method: 'POST',
        data: params
    });
}

/**
 * 删除数据-真删除
 * @param id 
 * @returns 
 */
export const remove = async (id: string) => {
    return request(`/api/${global.ALLOCATION}/allocationPosition/remove/${id}`);
}