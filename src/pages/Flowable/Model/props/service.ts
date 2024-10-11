import request from "@/utils/request"

/**
 * 流程模型分页查询
 * @param params 
 * @returns 
 */
export const pageQuery = async (params: any) => {
    return request(`/api/${global.FLOWABLE}/flowActModel/page`, {
        method: 'POST',
        data: params
    });
}

/**
 * 保存数据
 * @param params 
 * @returns 
 */
export const save = async (params: any) => {
    return request(`/api/${global.FLOWABLE}/flowActModel/save`, {
        method: 'POST',
        data: params
    });
}

/**
 * 删除数据
 * @param params 
 * @returns 
 */
export const remove = async (id: any) => {
    return request(`/api/${global.FLOWABLE}/flowActModel/remove/${id}`);
}

/**
 * 获取模型信息
 * @param params 
 * @returns 
 */
export const getById = async (id: any) => {
    return request(`/api/${global.FLOWABLE}/flowActModel/info/${id}`);
}
/**
 * 部署模型-定义流程
 * @param params 
 * @returns 
 */
export const deploymentModel = async (id: any) => {
    return request(`/api/${global.FLOWABLE}/flowDeployment/deployment/${id}`);
}
