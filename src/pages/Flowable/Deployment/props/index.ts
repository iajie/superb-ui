import { dictCode } from "@/utils/dict";
import { ProColumns } from "@ant-design/pro-components";
import { deleteDeployment, deploymentState, flowUserList, pageQuery } from "./service";
import React from "react";
import { message, Modal, Tag } from "antd";


/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: any) => {
    // 校验权限
    if (!global.getAuthority(['flowable:deployment:select'])) {
        return { success: false, data: [] };
    }
    const page = { current: params.current || 1, size: params.pageSize || 10 };
    const queryParams: any = {
        key: params.key,
        name: params.name,
        modelType: params.modelType,
    };
    const { success, result } = await pageQuery({ ...page, params: queryParams });
    return {
        success,
        data: result.records || [],
        total: result.total
    };
}

/**
 * 系统菜单权限-列表字段
 */
export const columns: ProColumns[] = [
    {
        title: '流程模型标识',
        dataIndex: 'key',
        align: 'center',
    },
    {
        title: '流程模型名称',
        dataIndex: 'name',
        ellipsis: true,
    },
    {
        title: '类型',
        dataIndex: 'modelType',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'flowType' },
        request: dictCode,
    },
    {
        title: '定义版本',
        dataIndex: 'version',
        align: 'center',
        search: false,
        render: (dom, record) => React.createElement(Tag, {}, `V ${dom}`)
    },
    {
        title: '部署时间',
        dataIndex: 'deploymentTime',
        align: 'center',
        valueType: 'dateTime',
        search: false,
    },
    {
        title: '流程定义状态',
        dataIndex: 'suspensionState',
        align: 'center',
        search: false,
        valueType: 'select',
        params: { dictType: 'flowState', isTag: true },
        request: dictCode,
    },
    {
        title: '是否有开始表单',
        dataIndex: 'hasStartFormKey',
        align: 'center',
        search: false,
        valueType: 'select',
        params: { dictType: 'YesNo', isTag: true },
        request: dictCode,
    },
];

/**
 * 流程定义状态设置
 */
export const deploymentStateSet = async (id: string, suspensionState: number, reload: Function) => {
    const str = suspensionState == 1 ? '终止' : '激活';
    const modal = Modal.confirm({
        title: '提示',
        content: `是否${str}该流程定义？`,
        onOk: async () => {
            const { success } = await deploymentState(id);
            if (success) {
                message.success(`流程定义${str}成功！`);
                modal.destroy();
                reload();
            }
        }
    });
}

/**
 * 流程定义状态设置
 */
export const deleteDeploymentById = async (id: string, reload: Function) => {
    const modal = Modal.confirm({
        title: '提示',
        content: `是否删除该流程定义？`,
        onOk: async () => {
            const { success } = await deleteDeployment({ deploymentId: id, cascade: true });
            if (success) {
                message.success('流程定义删除成功！');
                modal.destroy();
                reload();
            }
        }
    });
}

/**
 * 加载流程定义用户任务列表
 * @param params 
 * @returns 
 */
export const loadFlowUser = async (params: any) => {
    const { success, result } = await flowUserList(params.flowKey);
    return {
        success,
        data: result || []
    }
}