import { Modal, Tag, message } from "antd";
import { deploymentModel, getById, pageQuery, remove } from "./service";
import { ProColumns } from "@ant-design/pro-components";
import { dictCode } from "@/utils/dict";
import React from "react";

/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: any) => {
    // 校验权限
    if (!global.getAuthority(['flowable:model:select'])) {
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
 * 根据id删除数据
 * @param id 
 * @param reload 
 */
export const removeById = (id: string, reload: Function) => {
    const modal = Modal.confirm({
        title: '提示',
        content: '是否删除数据？',
        onOk: async () => {
            const { success } = await remove(id);
            if (success) {
                message.success('数据删除成功！');
                modal.destroy();
                reload();
            }
        }
    });
}

/**
 * 
 */
export const deployment = (id: string, reload: Function) => {
    const modal = Modal.confirm({
        title: '提示',
        content: '是否部署该模型？部署后启动流程将以当前模型版本为准！',
        onOk: async () => {
            const { success } = await deploymentModel(id);
            if (success) {
                message.success('流程模型部署成功！');
                modal.destroy();
                reload();
            }
        }
    });
}


/**
 * 根据id获取数据
 * @param id 
 * @param reload 
 */
export const details = async (id?: string) => {
    if (id) {
        const { success, result } = await getById(id);
        if (success) return result;
    }
    return {};
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
        title: '创建时间',
        dataIndex: 'createTime',
        align: 'center',
        valueType: 'dateTime',
        search: false,
    },
    {
        title: '最后更新时间',
        dataIndex: 'lastUpdateTime',
        align: 'center',
        valueType: 'dateTime',
        ellipsis: true,
        search: false,
    },
    {
        title: '模型版本',
        dataIndex: 'version',
        align: 'center',
        render: (dom: any, record) => {
            if (dom < 1) {
                return React.createElement(Tag, { color: 'geekblue' }, '尚未部署');
            }
            return React.createElement(Tag, { color: 'success' }, `V ${record.rev}`);
        },
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        align: 'center',
        ellipsis: true,
        search: false,
    },
];