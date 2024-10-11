import { Modal, message } from "antd";
import { BaseInterface } from "@/utils/BaseInterface";
import { ProColumns } from "@ant-design/pro-components";
import { delQuery, menuQuery, remove, detailsById, parentMenu, permissionList } from "./service";
import { sideMenu } from "@/utils/format";
import { dictCode } from "@/utils/dict";

/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: SystemPermissionProps) => {
    // 校验权限
    if (!global.getAuthority(['system:menu:select'])) {
        return { success: false, data: [] };
    }
    
    const { success, result } = await menuQuery(params.type);
    return {
        success,
        data: sideMenu(result) || [],
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
 * 根据id获取数据
 * @param id 
 * @param reload 
 */
export const parentMenuSearch = async (params: any) => {
    const { success, result } = await parentMenu(params.type);
    if (success) return result;
    return [];
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
 * 系统菜单权限-列表字段
 */
export const columns: ProColumns[] = [
    {
        title: '菜单类型',
        dataIndex: 'type',
        valueType: 'select',
        params: { dictType: 'MenuType' },
        initialValue: 0,
        request: dictCode,
        hideInTable: true,
    },
    {
        title: '名称',
        dataIndex: 'name',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '菜单路由',
        dataIndex: 'path',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '组件名称',
        dataIndex: 'component',
        align: 'center',
        search: false,
    },
    {
        title: '菜单图标',
        dataIndex: 'icon',
        align: 'center',
        search: false,
    },
    {
        title: '外链',
        dataIndex: 'outerChain',
        align: 'center',
        search: false,
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
        search: false,
    },
    {
        title: '排序',
        dataIndex: 'sort',
        align: 'center',
        search: false,
        ellipsis: true,
    },
];
/**
 * 菜单权限-列表字段
 */
export const permissionColumns: ProColumns[] = [
    {
        title: '名称',
        dataIndex: 'name',
        align: 'center',
        ellipsis: true
    },
    {
        title: '权限代码',
        dataIndex: 'perms',
        align: 'center',
        ellipsis: true
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        ellipsis: true
    },
];


/**
 * 查询表格数据
 * @param params 
 */
export const permissionLoadTableData = async (params: SystemPermissionProps | any) => {
    const { success, result } = await permissionList(params.id);
    return {
        success,
        data: result || [],
    };
}



/**
 * 系统菜单权限属性
 */
export interface SystemPermissionProps extends BaseInterface {
    /** 菜单类型 */ 
    type: number;
    /** 菜单属性 */ 
    menuType: number;
    /** 名称 */ 
    name: string;
    /** 菜单路由 */ 
    path: string;
    /** 组件名称 */ 
    component: string;
    /** 权限代码 */ 
    perms: string;
    /** 菜单图标 */ 
    icon: string;
    /** 父级菜单id */ 
    parentId: string;
    /** 外链 */ 
    outerChain: number;
    /** 状态 */ 
    status: number;
    /** 排序 */ 
    sort: number;
}