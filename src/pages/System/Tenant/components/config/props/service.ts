import request from "@/utils/request";

/**
 * 获取其他租户的菜单
 * @param tenantId 
 * @param type 
 * @returns 
 */
export const menuQuery = (tenantId: string) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/menu/${tenantId}`);
}

/**
 * 租户下拉
 * @param tenantId 
 * @param type 
 * @returns 
 */
export const tenantOptions = () => {
    return request(`/api/${global.SYSTEM}/tenantConfig/tenantOptions`);
}

/**
 * 菜单选项
 * @param tenantId 
 * @param type 
 * @returns 
 */
export const menuOptions = (tenantId: string) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/menuOptions/${tenantId}`);
}

/**
 * 根据id集合同步菜单
 * @param tenantId 
 * @param type 
 * @returns 
 */
export const synchronization = (data: any, tenantId: string) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/menu/synchronization/${tenantId}`, {
        method: 'POST',
        data
    });
}

/**
 * 根据id删除菜单
 * @param tenantId 
 * @param type 
 * @returns 
 */
export const deleteById = (id: string) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/menu/delete/${id}`);
}

/**
 * 获取其他租户的系统角色
 * @param tenantId 
 * @param type 
 * @returns 
 */
export const roleQuery = (tenantId: string) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/role/${tenantId}`);
}


/**
 * 新增数据
 * @param params 
 * @returns 
 */
export const roleAction = async (params: any) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/roleAction`, {
        method: 'POST',
        data: params
    });
}

/**
 * 获取其他租户的系统角色
 * @param tenantId 
 * @param type 
 * @returns 
 */
export const userQuery = (tenantId: string) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/user/${tenantId}`);
}


/**
 * 新增数据
 * @param params 
 * @returns 
 */
export const userAction = async (params: any) => {
    return request(`/api/${global.SYSTEM}/tenantConfig/userAction`, {
        method: 'POST',
        data: params
    });
}
