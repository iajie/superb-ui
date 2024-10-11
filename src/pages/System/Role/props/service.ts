import request from "@/utils/request"

/**
 * 分页查询
 * @param params 
 * @returns 
 */
export const pageQuery = async (params: any) => {
    return request(`/api/${global.SYSTEM}/systemRole/pageQuery`, {
        method: 'POST',
        data: params
    });
}

/**
 * 新增数据
 * @param params 
 * @returns 
 */
export const insert = async (params: any) => {
    return request(`/api/${global.SYSTEM}/systemRole/insert`, {
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
    return request(`/api/${global.SYSTEM}/systemRole/update`, {
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
    return request(`/api/${global.SYSTEM}/systemRole/remove/${id}`);
}

/**
 * 根据id获取详情信息
 * @returns 
 */
export const detailsById = async (id: string) => {
    return request(`/api/${global.SYSTEM}/systemRole/info/${id}`);
}

/**
 * 回收站-假删除数据
 * @returns 
 */
export const delQuery = async () => {
    return request(`/api/${global.SYSTEM}/systemRole/delQuery`);
}

/**
 * 数据恢复-需为回收站内的数据，直接掉该接口无法正常恢复
 * @param id 回收站数据id集合
 * @returns 
 */
export const recovery = async (id: string[]) => {
    return request(`/api/${global.SYSTEM}/systemRole/recovery`, {
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
    return request(`/api/${global.SYSTEM}/systemRole/delete`, {
        method: 'POST',
        data: { id }
    });
}

/**
 * 获取角色权限
 * @param id 
 * @returns 
 */
export const rolePermission = async (roleId: string) => {
    return request(`/api/${global.SYSTEM}/systemPermission/rolePermission/${roleId}`);
}

/**
 * 获取菜单和权限
 * @param id 
 * @returns 
 */
export const menuPermissionList = async (menuType: number) => {
    return request(`/api/${global.SYSTEM}/systemRole/menuPermission/${menuType}`);
}

/**
 * 获取菜单和权限
 * @param id 
 * @returns 
 */
export const addDistribution = async (roleId: string, permissionId: string, type: 'tree' | 'checkbox') => {
    const data: any = { roleId };
    if (type == 'tree') {
        data.menuIds = [permissionId];
        data.permissionIds = [];
    } else {
        data.menuIds = [];
        data.permissionIds = [permissionId];
    }
    return request(`/api/${global.SYSTEM}/systemPermission/permission/addDistribution`, {
        method: 'POST',
        data
    });
}

/**
 * 获取菜单和权限
 * @param id 
 * @returns 
 */
export const distribution = async (roleId: string, permissionIds: string[], menuIds: string[]) => {
    return request(`/api/${global.SYSTEM}/systemPermission/permission/distribution`, {
        method: 'POST',
        data: { roleId, permissionIds, menuIds }
    });
}

/**
 * 获取菜单和权限
 * @param id 
 * @returns 
 */
export const removeDistribution = async (roleId: string, permissionId: string, type: 'tree' | 'checkbox') => {
    const data: any = { roleId };
    if (type == 'tree') {
        data.menuIds = [permissionId];
        data.permissionIds = [];
    } else {
        data.menuIds = [];
        data.permissionIds = [permissionId];
    }
    return request(`/api/${global.SYSTEM}/systemPermission/permission/removeDistribution`, {
        method: 'POST',
        data
    });
}