import { BaseInterface } from "@/utils/BaseInterface";
import { ProColumns } from "@ant-design/pro-components";
import { dataScopeList, dataScopeUpdateMain, delQuery, detailsById, pageQuery, remove, userOnlineKickout, userOnlineList, userOnlineLogout } from "./service";
import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, message, Image, Space, Tag, Switch } from "antd";
import { dictCode, loadQuery } from "@/utils/dict";
import { treeSelectProps } from "@/utils/tree";

/**
 * 查询表格数据
 * @param params 
 */
export const loadTableData = async (params: SystemUserProps | any) => {
    // 校验权限
    if (!global.getAuthority(['system:user:select'])) {
        return { success: false, data: [] };
    }
    const page = { current: params.current || 1, size: params.pageSize || 10 };
    const queryParams: any = {
        username: params.username,
        password: params.password,
        salt: params.salt,
        superb: params.superb,
        organId: params.organId
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
 * 系统用户-列表字段
 */
export const columns: ProColumns[] = [
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
                src: global.viewUrl(entity.avatar) || '',
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
    // {
    //     title: '是否认证',
    //     dataIndex: 'authentication',
    //     align: 'center',
    //     search: false,
    //     ellipsis: true,
    // },
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
/**
 * 系统用户属性
 */
export interface SystemUserProps extends BaseInterface {
    /** 用户名 */
    username: string;
    /** 登录密码 */
    password: string;
    /** 用户随机盐 */
    salt: string;
    /** 昵称 */
    nickname: string;
    /** 电话号码 */
    phoneNumber: string;
    /** 电子邮箱 */
    email: string;
    /** 身份证号 */
    idcard: string;
    /** 头像 */
    avatar: string;
    /** 性别 */
    sex: number;
    /** 是否认证 */
    authentication: number;
    /** 状态 */
    status: number;
    /** 租户管理员 */
    superb: number;
}

/**
 * 加载用户数据权限列表
 * @param params 
 * @returns 
 */
export const dataScopeLoad = async (params: any) => {
    const { success, result } = await dataScopeList(params.userId);
    return {
        success,
        data: result || []
    }
}

/**
 * 用户数据权限-列表字段
 */
export const dataScopeColumns = (state: any, setState: Function, reload: Function): ProColumns[] => [
    {
        title: '部门',
        dataIndex: 'organId',
        align: 'center',
        valueType: 'treeSelect',
        request: loadQuery,
        fieldProps: {
            fieldNames: treeSelectProps,
        },
    },
    {
        title: '权限范围',
        dataIndex: 'dataScopeType',
        align: 'center',
        valueType: 'select',
        request: dictCode,
        params: { dictType: 'DataScope', isTag: true }
    },
    {
        title: '是否默认',
        dataIndex: 'isMain',
        align: 'center',
        render: (dom, entity) => {
            const loadingKey = `swich_loading_${entity.id}`;
            return React.createElement(Switch, {
                checkedChildren: '是',
                key: `switch_${entity.id}`,
                unCheckedChildren: '否',
                checked: entity.isMain == 1,
                loading: state[loadingKey] || false,
                onClick: async (checked: boolean) => {
                    setState({ ...state, [loadingKey]: true });
                    try {
                        const { success } = await dataScopeUpdateMain({ id: entity.id, isMain: checked ? 1 : 0 });
                        if (success) {
                            message.success('成功！');
                            reload();
                        }
                    } finally {
                        setState({ ...state, [loadingKey]: false });
                    }
                }
            });
        },
    },
    {
        title: '状态',
        dataIndex: 'enable',
        align: 'center',
        valueType: 'select',
        request: dictCode,
        params: { dictType: 'status', isTag: true }
    },
    {
        title: '角色',
        dataIndex: 'roles',
        align: 'center',
        render: (dom, entity, index, action, schema) => {
            if (entity.roles && entity.roles.length) {
                return React.createElement(Space, { direction: 'vertical' }, entity.roles.map((i: any) => React.createElement(Tag, { color: 'cyan', key: `role_tag_${i.value}` }, i.label)));
            }
            return '-';
        },
    },
];

export const userOnlineColumns: ProColumns[] = [
    {
        title: '序号',
        valueType: 'index',
        width: 50
    },
    {
        title: '登录凭证',
        dataIndex: 'token',
        ellipsis: true,
        copyable: true,
    },
    {
        title: '登录客户端',
        dataIndex: 'deviceType',
        valueType: 'select',
        params: { dictType: 'deviceType', isTag: true },
        request: dictCode
    },
    // {
    //     title: '活跃数据权限',
    //     dataIndex: 'organId',
    //     valueType: 'treeSelect',
    //     request: loadQuery,
    //     fieldProps: {
    //         fieldNames: treeSelectProps,
    //     },
    // },
    {
        title: '登录ip',
        dataIndex: 'loginIp',
    },
    {
        title: '登录方式',
        dataIndex: 'loginType',
        valueType: 'select',
        params: { dictType: 'loginType', isTag: true },
        request: dictCode
    },
    {
        title: '登录时间',
        dataIndex: 'loginTime',
    },
    {
        title: '最后活跃时间',
        dataIndex: 'lastActiveTime',
    },
];

/**
 * 在线列表
 * @param params 
 * @returns 
 */
export const userOnlineQuery = async(params: any) => {
    const { success, result } = await userOnlineList(params.userId);
    return {
        success,
        data: result || []
    }
}

export const onlineAction = (token: string, action: 'logout' | 'kickout', reload: Function) => {
    const modal = Modal.confirm({
        title: '提示',
        content: '是否确认本次操作?',
        onOk: async () => {
            let res;
            if (action == 'logout') {
                res = await userOnlineLogout(token);
            } else {
                res = await userOnlineKickout(token);
            }
            if (res.success) {
                message.success(`${action == 'logout' ? '注销' : '下线'}成功！`);
                modal.destroy();
                reload();
            }
        }
    });
}