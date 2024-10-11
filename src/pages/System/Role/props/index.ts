import { Modal, message } from "antd";
import { BaseInterface } from "@/utils/BaseInterface";
import { ProColumns } from "@ant-design/pro-components";
import { delQuery, pageQuery, remove, detailsById } from "./service";
import { dictCode } from "@/utils/dict";

/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: SystemRoleProps | any) => {
    // 校验权限
    if (!global.getAuthority(['system:role:manage'])) {
        return { success: false, data: [] };
    }
    const page = { current: params.current || 1, size: params.pageSize || 10 };
    const queryParams: any = {
        name: params.name,
        code: params.code,
        sort: params.sort,
        organId: params.type == 0 ? null : params.organId,
    };
    const { success, result } = await pageQuery({ ...page, params: queryParams });
    return {
        success,
        total: result.total || 0,
        data: result.records || [],
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
        content: '是否删除数据？删除后可到回收站查看！',
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
 * 根据id获取数据
 * @param id 
 * @param reload 
 */
export const details = async (id?: string) => {
    if (id) {
        const { success, result } = await detailsById(id);
        if (success) return result;
    }
    return {};
}

/**
 * 查询回收站数据
 * @param params 
 */
export const loadDeleteData = async () => {
    const { success, result } = await delQuery();
    return {
        success,
        data: result || [],
    };
}
/**
 * 系统角色-列表字段
 */
export const columns: ProColumns[] = [
    {
        title: '序号',
        valueType: 'index',
        width: 50
    },
    {
        title: '角色名称',
        dataIndex: 'name',
        align: 'center',
        search: true,
        ellipsis: true,
    },
    {
        title: '角色代码',
        dataIndex: 'code',
        align: 'center',
        search: true,
        ellipsis: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        search: false,
        valueType: 'select',
        params: { dictType: 'status', isTag: true },
        request: dictCode,
    },
    {
        search: false,
        title: '排序',
        dataIndex: 'sort',
        align: 'center',
    },
];
/**
 * 系统角色属性
 */
export interface SystemRoleProps extends BaseInterface {
    /** 角色名称 */
    name: string;
    /** 角色代码 */
    code: string;
    /** 状态 */
    status: number;
    /** 排序 */
    sort: number;
}



    /**
     * 获取权限
     * @param permissionIds
     * @param data
     */
    export const getPermission = (menuIds: any[], permissionIds: any[], data: any[]) => {
        for (const i in data) {
            const node = data[i];
            if (node.menuType === 1 && node.permissions) {
                getPermissionId(permissionIds, node.permissions);
            }
            menuIds.push(node.id);
            if (node.children) {
                getPermission(menuIds, permissionIds, node.children);
            }
        }
    }

    /**
     * 获取权限ID
     * @param list
     * @param data
     * @returns
     */
    export const getPermissionId = (permissionIds: any[], data: any[]) => {
        for (const i in data) {
            const node = data[i];
            permissionIds.push(node.id);
        }
    }