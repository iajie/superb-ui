import request from "@/utils/request";

/**
 * 验证码
 * @param type
 */
export const validateImage = async (type: 'random' | 'calc') => {
    return request(`/api/${global.SYSTEM}/admin/login/validateImage/${type}`);
}

/**
 * 验证码
 * @param phoneNumber 手机号码
 */
export const validateCode = async (phoneNumber: string) => {
    return request(`/api/${global.SYSTEM}/admin/login/validateCode/${phoneNumber}`);
}

/**
 * 账号密码登录
 * @param data 
 */
export const pwdLogin = async (data: any) => {
    return request(`/api/${global.SYSTEM}/admin/login/pwdLogin`, {
        data,
        method: 'post'
    });
}

/**
 * 验证码登录
 * @param data 
 */
export const phoneCodeLogin = async (data: any) => {
    return request(`/api/${global.SYSTEM}/admin/login/phoneCodeLogin`, {
        data,
        method: 'post'
    });
}

/**
 * 退出登录
 * @returns 
 */
export const loginOut = async () => {
    return request(`/api/${global.SYSTEM}/admin/login/loginOut`);
}

/**
 * 获取当前登录用户
 * @returns 
 */
export const getCurrentUser = async () => {
    return request(`/api/${global.SYSTEM}/current/user`);
}

/**
 * 获取当前租户信息
 * @returns 
 */
export const getTennat = async () => {
    return request(`/api/${global.SYSTEM}/admin/login/tenantInfo`);
}

/**
 * 清除后端缓存
 * @returns 
 */
export const clearCache = async () => {
    return request(`/api/${global.SYSTEM}/admin/login/clearCache`);
}


/**
 * 获取当前登录用户菜单
 * @returns 
 */
export const getMenu = async (type: 'top' | 'side') => {
    return request(`/api/${global.SYSTEM}/systemPermission/menu/${type}`);
}

/**
 * 获取当前登录用户菜单
 * @returns 
 */
export const topAndSideMenu = async () => {
    const menuRes = await Promise.all([getMenu('top'), getMenu('side')]);
    if (menuRes[0].success && menuRes[1].success) {
        return { topMenus: menuRes[0].result, leftMenus: menuRes[1].result };
    }
    return { topMenus: [], leftMenus: [] };
}


/**
 * 部门树查询-针对当前登录用户
 * @returns 
 */
export const treeOrgan = async () => {
    return request(`/api/${global.SYSTEM}/organization/tree`, {
        method: 'GET',
    });
}

/**
 * 部门树查询-针对当前登录用户
 * @returns 
 */
export const userOptions = async (organId?: string) => {
    return request(`/api/${global.SYSTEM}/systemUser/options`, {
        method: 'GET',
        params: { organId }
    });
}