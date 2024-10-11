import request from "@/utils/request";

/**
 * 分页查询
 * @param params 
 * @returns 
 */
export const levelQuery = async (params: any) => {
    return request(`/api/${global.ALLOCATION}/allocationPosition/query`, {
        method: 'POST',
        data: params
    });
}