import { sideMenu } from "@/utils/format";
import { menuQuery, tenantOptions as tenantOptionsApi, menuOptions as menuOptionsApi, deleteById, roleQuery, userQuery } from "./service";
import { dictCode } from "@/utils/dict";
import { ProColumns } from "@ant-design/pro-components";
import { message, Modal, Image } from "antd";
import React from "react";
import { EyeOutlined } from "@ant-design/icons";

/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: any) => {
    const { success, result } = await menuQuery(params.tenantId);
    return {
        success,
        data: sideMenu(result) || [],
    };
}

export const tenantOptions = async () => {
    const { success, result } = await tenantOptionsApi();
    if (success) {
        return result;
    }
    return [];
}

export const removeById = async (id: string, reload: Function) => {
    const modal = Modal.confirm({
        title: '提示',
        content: '是否删除数据？',
        onOk: async () => {
            const { success } = await deleteById(id);
            if (success) {
                message.success('数据删除成功！');
                modal.destroy();
                reload();
            }
        }
    });
}

export const menuOptions = async ({ tenantId }: any) => {
    if (tenantId) {
        const { success, result } = await menuOptionsApi(tenantId);
        if (success) {
            return result.filter((i: any) => {
                if (i.label.indexOf('租户') !== -1 || i.label.indexOf('基础数据') !== -1) {
                    i.disabled = true;
                }
                return true;
            });
        }
    }
    return [];
}

/**
 * 系统菜单权限-列表字段
 */
export const columns: ProColumns[] = [
    {
        title: '菜单类型',
        dataIndex: 'type',
        valueType: 'select',
        params: { dictType: 'MenuType' },
        request: dictCode,
    },
    {
        title: '菜单属性',
        dataIndex: 'menuType',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'MenuLevel', isTag: true },
        request: dictCode,
    },
    {
        title: '名称',
        dataIndex: 'name',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '菜单路由',
        dataIndex: 'path',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '组件名称',
        dataIndex: 'component',
        align: 'center',
    },
    {
        title: '菜单图标',
        dataIndex: 'icon',
        align: 'center',
    },
    {
        title: '外链',
        dataIndex: 'outerChain',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'YesNo' },
        request: dictCode,
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'status', isTag: true },
        request: dictCode,
    },
    {
        title: '排序',
        dataIndex: 'sort',
        align: 'center',
        ellipsis: true,
    },
];


/**
 * 查询角色表格数据
 * @param params 
 */
export const loadRoleTableData = async (params: any) => {
    const { success, result } = await roleQuery(params.tenantId);
    return {
        success,
        data: result || [],
    };
}

/**
 * 系统角色-列表字段
 */
export const roleColumns: ProColumns[] = [
    {
        title: '序号',
        valueType: 'index',
        width: 50
    },
    {
        title: '角色名称',
        dataIndex: 'name',
        align: 'center',
    },
    {
        title: '角色代码',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'status', isTag: true },
        request: dictCode,
    },
    {
        title: '排序',
        dataIndex: 'sort',
        align: 'center',
    },
];


/**
 * 查询角色表格数据
 * @param params 
 */
export const loadUserTableData = async (params: any) => {
    const { success, result } = await userQuery(params.tenantId);
    return {
        success,
        data: result || [],
    };
}

/**
 * 系统角色-列表字段
 */
export const userColumns: ProColumns[] = [
    {
        title: '序号',
        valueType: 'index',
        width: 50
    },
    {
        title: '用户名',
        dataIndex: 'username',
        align: 'center',
        search: true,
        ellipsis: true,
    },
    {
        title: '昵称',
        dataIndex: 'nickname',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '电话号码',
        dataIndex: 'phoneNumber',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '电子邮箱',
        dataIndex: 'email',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '身份证号',
        dataIndex: 'idcard',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        align: 'center',
        search: false,
        render: (dom, entity) => {
            return React.createElement(Image, {
                src: global.viewUrl(entity.avatar),
                preview: { mask: React.createElement(EyeOutlined) },
                width: 40,
                height: 40
            });
        },
    },
    {
        title: '性别',
        dataIndex: 'sex',
        align: 'center',
        valueType: 'select',
        params: { dictType: 'sex' },
        request: dictCode,
        search: false,
    },
    {
        title: '状态',
        dataIndex: 'status',
        search: false,
        valueType: 'select',
        params: { dictType: 'status', isTag: true },
        request: dictCode,
        align: 'center',
    },
];