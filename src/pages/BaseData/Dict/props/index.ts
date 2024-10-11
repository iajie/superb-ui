import { Modal, message } from "antd";
import { BaseInterface } from "@/utils/BaseInterface";
import { ProColumns } from "@ant-design/pro-components";
import { pageQuery, dictQuery } from "./service";
import { dictCode } from "@/utils/dict";

/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: AllocationDictProps | any) => {
    // 校验权限
    if (!global.getAuthority(['allocation:dict:manage'])) {
        return { success: false, data: [] };
    }
    const page = { current: params.current || 1, size: params.pageSize || 10 };
    const queryParams: any = {
        name: params.name,
        code: params.code,
        type: params.type,
    };
    const { success, result } = await pageQuery({ ...page, params: queryParams });
    return {
        success,
        total: result.total || 0,
        data: result.records || [],
    };
}

/**
 * 查询字典数据
 * @param params 
 */
export const loadDictTableData = async (params: AllocationDictProps | any) => {
    const page = { current: params.current || 1, size: params.pageSize || 10 };
    const queryParams: any = {
        dictType: params.dictType,
        name: params.name,
        status: params.status,
    };
    const { success, result } = await dictQuery({ ...page, params: queryParams });
    return {
        success,
        total: result.total || 0,
        data: result.records || [],
    };
}

/**
 * 数据字典-列表字段
 */
export const columns: ProColumns[] = [
    {
        title: '类型名称',
        dataIndex: 'name',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '类型CODE',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        search: false,
        valueType: 'select',
        params: { dictType: 'status', isTag: true },
        request: dictCode
    },
    {
        title: '类型',
        dataIndex: 'type',
        align: 'center',
        valueType: 'select',
        initialValue: 0,
        fieldProps: {
            // 不允许清除
            allowClear: false
        },
        hideInTable: true,
        params: { dictType: 'dictType' },
        request: dictCode
    },
    {
        title: '排序',
        dataIndex: 'sort',
        align: 'center',
        search: false,
    },
];

/**
 * 数据字典-列表字段
 */
export const dictColumns: ProColumns[] = [
    {
        title: '类型名称',
        dataIndex: 'name',
        align: 'center',
    },
    {
        title: '类型CODE',
        dataIndex: 'code',
        align: 'center',
        search: false,
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'status', isTag: true },
        request: dictCode
    },
    {
        title: '字典Tag',
        dataIndex: 'type',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'dictStatus', isTag: true },
        request: dictCode,
        search: false,
    },
    {
        title: '排序',
        dataIndex: 'sort',
        align: 'center',
        search: false,
    },
];

/**
 * 数据字典属性
 */
export interface AllocationDictProps extends BaseInterface {
    /** 类型名称 */ 
    name: string;
    /** 字典类型 */ 
    code: string;
    /** 状态 */ 
    status: number;
    /** 父级字典 */ 
    parentId: string;
    /** 字典类型 */ 
    dictType: string;
    /** 排序 */ 
    sort: string;
    /** 类型 */ 
    type: number;
}