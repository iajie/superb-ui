import { treeOrgan } from "@/services/user.service"
import { BaseInterface } from "@/utils/BaseInterface";
import { ProColumns } from "@ant-design/pro-components";
import { delQuery, detailsById, remove } from "./service";
import { Modal, message } from "antd";

export const treeQuery = async () => {
    const { success, result } = await treeOrgan();
    if (success) {
        return result;
    }
    return [];
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
 * 部门机构-列表字段
 */
export const columns: ProColumns[] = [
    {
        title: '序号',
        valueType: 'index',
        width: 50
    },
    {
        title: '父机构ID',
        dataIndex: 'parentId',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '父级标记',
        dataIndex: 'parentCode',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '机构编码',
        dataIndex: 'customCode',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '机构/部门名称全称',
        dataIndex: 'name',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '简称',
        dataIndex: 'shortName',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '区域编码',
        dataIndex: 'areaCode',
        align: 'center',
        search: true,
        ellipsis: true,
    },
    {
        title: '区域名称',
        dataIndex: 'areaName',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '排序',
        dataIndex: 'sort',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '经度',
        dataIndex: 'longitude',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '纬度',
        dataIndex: 'latitude',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '详细地址',
        dataIndex: 'address',
        align: 'center',
        search: false,
        ellipsis: true,
    },
    {
        title: '类型',
        dataIndex: 'type',
        align: 'center',
        search: false,
        ellipsis: true,
    },
];
/**
 * 部门机构属性
 */
export interface SystemOrganizationProps extends BaseInterface {
    /** 父机构ID */ 
    parentId: string;
    /** 父级标记 */ 
    parentCode: number;
    /** 机构编码 */ 
    customCode: string;
    /** 机构/部门名称全称 */ 
    name: string;
    /** 简称 */ 
    shortName: string;
    /** 区域编码 */ 
    areaCode: number;
    /** 区域名称 */ 
    areaName: string;
    /** 排序 */ 
    sort: number;
    /** 经度 */ 
    longitude: number;
    /** 纬度 */ 
    latitude: number;
    /** 详细地址 */ 
    address: string;
    /** 类型 */ 
    type: number;
}