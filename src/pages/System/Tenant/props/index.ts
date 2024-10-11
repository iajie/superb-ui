import React from "react";
import { dictCode } from "@/utils/dict";
import { Image, Modal, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { BaseInterface } from "@/utils/BaseInterface";
import { ProColumns } from "@ant-design/pro-components";
import { delQuery, detailsById, pageQuery, remove } from "./service";

/**
 * 系统租户管理表属性
 */
export interface SystemTennatProps extends BaseInterface {
    /** 租户id标识 */ 
    tennatKey: string;
    /** 租户名称 */ 
    name: string;
    /** 租户logo */ 
    logo: string;
    /** 法人 */ 
    legalPerson: string;
    /** 联系电话 */ 
    phone: string;
    /** 身份证号 */ 
    idcard: string;
    /** 银行卡号 */ 
    bankNo: string;
    /** 开户行 */ 
    bank: string;
    /** 统一信用代码 */ 
    creditCode: string;
    /** 企业注册地址 */ 
    registeredAddress: string;
    /** 营业执照 */ 
    businessImage: string;
    /** 身份证正面 */ 
    frontIdcard: string;
    /** 身份证反面 */ 
    backIdcard: string;
    /** 租户页脚配置 */ 
    footer: string;
    /** 租户状态 */ 
    status: number;
}

/**
 * 系统租户管理表-列表字段
 */
export const columns: ProColumns[] = [
    {
        title: '序号',
        valueType: 'index',
        width: 50
    },
    {
        title: '标识',
        dataIndex: 'tenantKey',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '租户名称',
        dataIndex: 'name',
        ellipsis: true,
    },
    {
        title: '租户logo',
        dataIndex: 'logo',
        search: false,
        render: (dom, entity) => {
            return React.createElement(Image, {
                src: global.viewUrl(entity.logo),
                preview: { mask: React.createElement(EyeOutlined) },
                width: 40,
                height: 40
            });
        },
    },
    {
        title: '法人',
        dataIndex: 'legalPerson',
        ellipsis: true,
    },
    {
        title: '联系电话',
        dataIndex: 'phone',
        ellipsis: true,
    },
    {
        title: '租户状态',
        dataIndex: 'status',
        valueType: 'select',
        params: { dictType: 'status', isTag: true },
        request: dictCode,
        align: 'center',
    },
];

/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: SystemTennatProps | any) => {
    // 校验权限
    if (!global.getAuthority(['system:tenant:select'])) {
        return { success: false, data: [] };
    }
    const page = { current: params.current || 1, size: params.pageSize || 10 };
    const queryParams: any = {
        tennatKey: params.tennatKey,
        name: params.name,
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
 * 查询表格数据
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
 * 租户弹框属性
 */
export interface TenantConfigProps {
    /** 弹框标题 */
    title?: string;
    /** 弹框控制 */
    open: boolean;
    /** 关闭弹框 */
    closeModal?: () => void;
    /** 租户id */
    tenantId: string;
}