import request from "@/utils/request"

/**
 * 分页查询
 * @param params 
 * @returns 
 */
export const pageQuery = async (params: any) => {
    return request(`/api/${global.SYSTEM}/systemUser/pageQuery`, {
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
    return request(`/api/${global.SYSTEM}/systemUser/insert`, {
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
    return request(`/api/${global.SYSTEM}/systemUser/update`, {
        method: 'POST',
        data: params
    });
}

/**
 * 修改密码
 * @param params 
 * @returns 
 */
export const updatePassword = async (params: any) => {
    return request(`/api/${global.SYSTEM}/systemUser/updatePassword`, {
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
    return request(`/api/${global.SYSTEM}/systemUser/remove/${id}`);
}

/**
 * 回收站-假删除数据
 * @returns 
 */
export const delQuery = async () => {
    return request(`/api/${global.SYSTEM}/systemUser/delQuery`);
}

/**
 * 数据恢复-需为回收站内的数据，直接掉该接口无法正常恢复
 * @param id 回收站数据id集合
 * @returns 
 */
export const recovery = async (id: string[]) => {
    return request(`/api/${global.SYSTEM}/systemUser/recovery`, {
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
    return request(`/api/${global.SYSTEM}/systemUser/delete`, {
        method: 'POST',
        data: { id }
    });
}


/**
 * 获取用户详情
 * @returns 
 */
export const detailsById = async (id: string) => {
    return request(`/api/${global.SYSTEM}/systemUser/info/${id}`);
}

/**
 * 获取用户数据权限
 * @returns 
 */
export const dataScopeList = async (userId: string) => {
    return request(`/api/${global.SYSTEM}/userDataScope/list/${userId}`);
}

/**
 * 用户数据权限新增
 * @returns 
 */
export const dataScopeInsert = async (data: any) => {
    return request(`/api/${global.SYSTEM}/userDataScope/insert`, {
        method: 'POST',
        data
    });
}

/**
 * 用户数据权限修改
 * @returns 
 */
export const dataScopeUpdate = async (data: any) => {
    return request(`/api/${global.SYSTEM}/userDataScope/update`, {
        method: 'POST',
        data
    });
}

/**
 * 用户数据权限修改
 * @returns 
 */
export const dataScopeUpdateMain = async (data: any) => {
    return request(`/api/${global.SYSTEM}/userDataScope/updateMain`, {
        method: 'POST',
        data
    });
}

/**
 * 系统角色列表
 * @returns 
 */
export const systemRoleList = async () => {
    return request(`/api/${global.SYSTEM}/systemRole/systemList`);
}

/**
 * 在线列表
 * @returns 
 */
export const userOnlineList = async (userId: string) => {
    return request(`/api/${global.SYSTEM}/userOnline/list/${userId}`);
}

/**
 * 用户注销
 * @returns 
 */
export const userOnlineLogout = async (token: string) => {
    return request(`/api/${global.SYSTEM}/userOnline/logout/${token}`);
}

/**
 * 下线
 * @returns 
 */
export const userOnlineKickout = async (token: string) => {
    return request(`/api/${global.SYSTEM}/userOnline/kickout/${token}`);
}
