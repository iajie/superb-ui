import request from "@/utils/request";

/**
 * 流程模型分页查询
 * @param params 
 * @returns 
 */
export const pageQuery = async (params: any) => {
    return request(`/api/${global.FLOWABLE}/flowDeployment/page`, {
        method: 'POST',
        data: params
    });
}

/**
 * 删除流程定义
 * @param params 
 * @returns 
 */
export const deploymentState = async (deploymentId: any) => {
    return request(`/api/${global.FLOWABLE}/flowDeployment/deploymentState/${deploymentId}`);
}

/**
 * 流程定义状态设置
 * @param params 
 * @returns 
 */
export const deleteDeployment = async (params: { deploymentId: string; cascade?: boolean }) => {
    return request(`/api/${global.FLOWABLE}/flowDeployment/deleteDeployment`, { params });
}

/**
 * 流程定义用户任务节点
 * @param params 
 * @returns 
 */
export const flowUserList = async (flowKey: string) => {
    return request(`/api/${global.FLOWABLE}/flowDeployment/flowUserList/${flowKey}`);
}

/**
 * 流程定义用户任务节点
 * @param params 
 * @returns 
 */
export const loadPicture = async (processDefinitionId: string) => {
    return request(`/api/${global.FLOWABLE}/flowDeployment/loadPng/${processDefinitionId}`, {  
        resposeType: 'blob'
    });
}