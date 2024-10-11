import request from "@/utils/request";


/**
 * 修改本人基础信息
 * @returns 
 */
export const updateBase = async (params: any) => {
    return request(`/api/${global.SYSTEM}/current/user/updateBase`, {
        method: 'POST',
        data: params
    });
}

/**
 * 修改本人登录账号
 * @returns 
 */
export const updateAccount = async (params: any) => {
    return request(`/api/${global.SYSTEM}/current/user/updateAccount`, {
        method: 'POST',
        data: params
    });
}

/**
 * 修改本人登录密码
 * @returns 
 */
export const updatePassword = async (params: any) => {
    return request(`/api/${global.SYSTEM}/current/user/updatePassword`, {
        method: 'POST',
        data: params
    });
}