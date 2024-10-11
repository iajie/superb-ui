/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-05-29 15:24:26
 * @Description: 
 */
import React, { useRef, useState } from "react";
import { Dropdown, MenuProps, message, Modal, Space } from "antd";
import SystemUserModal from "./components";
import { Button, Deleted } from "@/components";
import { OptionType } from "@/utils/BaseInterface";
import { realDelete, recovery, updatePassword } from "./props/service";
import { DeleteOutlined, DownOutlined, DropboxOutlined, EditOutlined, PlusOutlined, ReconciliationOutlined } from "@ant-design/icons";
import { columns, loadDeleteData, loadTableData, removeById } from "./props";
import { ActionType, PageContainer, ProColumns, ProForm, ProFormText, ProTable } from "@ant-design/pro-components";
import DataScope from "./components/DataScope";
import { loadQuery } from "@/utils/dict";
import { treeSelectProps } from "@/utils/tree";
import UserOnline from "./components/Online";

/**
 * 系统用户-页面
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemUser: React.FC = () => {
    const table = useRef<ActionType>();
    
    const [state, setState] = useState<any>({
        title: "",
        open: false,
        action: "",
        dataId: '',
        width: "50%",
    });
    
    const [dataScope, setDataScope] = useState<any>({
        title: "",
        open: false,
        dataId: '',
    });
    /**
     * 主动刷新表格
     */
    const reloadTable = () => {
        // @ts-ignore
        table.current?.reloadAndRest();
    }
    
    /**
     * 打开新增、编辑
     */
    const openModal = (action: OptionType, row: any) => {
        let title;
        if (action === "insert") {
            title = "新增系统用户信息";
        } else if (action === 'info') {
            title = "查看系统用户详情";
        } else {
            title = '系统用户信息编辑';
        }
        setState({ ...state, action: action, dataId: row?.id, open: true, title: title });
    }
    
    /**
     * 关闭对话框
     */
    const closeModel = (open: boolean) => {
        if (!open) {
            setState({ ...state, open: false });
        }
    }
    
    /**
     * 关闭对话框
     */
    const closeDataScope = () => {
        setDataScope({ ...dataScope, open: false });
    }

    const moreAction = (record: any): MenuProps['items'] => {
        const arr: MenuProps['items'] = [];
        if (global.getAuthority(['system:user:update'])) {
            arr.push({
                label: <Button type="link" icon={<EditOutlined />} style={{ width: '100%', textAlign: 'left' }} warning onClick={() => openModal('update', record)}>编辑</Button>,
                key: 'edit',
            });
            arr.push({
                label: <Button type="link" icon={<DeleteOutlined />} style={{ width: '100%', textAlign: 'left' }} danger onClick={() => removeById(record.id, reloadTable)}>删除</Button>,
                key: 'delete',
            });
            arr.push({
                label: <Button type="link" icon={<EditOutlined />} style={{ width: '100%', textAlign: 'left', color: '#3b5999' }} onClick={() => {
                    const modal = Modal.confirm({
                        title: '修改密码',
                        footer: false,
                        content: <ProForm submitter={{ searchConfig: { resetText: '取消' } }} onReset={() => modal.destroy()} onFinish={async(values) => {
                            const { success } = await updatePassword({ id: record.id, ...values });
                            if (success) {
                                message.success('密码修改成功！');
                                // 关闭弹窗 
                                modal.destroy();
                            }
                        }}>
                            <ProFormText.Password label="新密码" name="password" rules={[{ required: true, message: '密码不能为空！' }, { min: 8, max: 16, message: '密码必须在8~16位之间' }]}/>
                        </ProForm>
                    });
                }}>修改密码</Button>,
                key: 'editPassword',
            });
        }
        arr.push({
            label: <UserOnline type="link" icon={<ReconciliationOutlined />} style={{ width: '100%', color: 'ActiveBorder', textAlign: 'left' }} info userId={record.id}>在线列表</UserOnline>,
            key: 'online',
        });
        if (global.getAuthority(['system:dataScope:manage'])) {
            arr.push({
                label: <Button type="link" icon={<DropboxOutlined />} style={{ width: '100%', textAlign: 'left' }} success onClick={() => {
                    setDataScope({ title: `[${record.nickname}]数据权限`, open: true, dataId: record.id });
                }}>数据权限</Button>,
                key: 'dataScope',
            });
        }
        return arr;
    }
    
    const actionColumns: ProColumns[] = [
        {
            title: '所属部门',
            dataIndex: 'organId',
            align: 'center',
            valueType: 'treeSelect',
            request: loadQuery,
            fieldProps: {
                fieldNames: treeSelectProps,
            },
            search: true,
        },
        {
            title: '操作',
            align: 'center',
            search: false,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                <Button type="text" info onClick={() => openModal('info', record)}>详情</Button>
                <Dropdown menu={{ items: moreAction(record) }} trigger={['click']}>
                    <Button type="link" permissions={['system:user:update']} onClick={(e) => e.preventDefault()}>更多<DownOutlined /></Button>
                </Dropdown>
            </Space>
        }
    ];
    
    return <PageContainer>
        <ProTable 
            request={loadTableData}
            rowKey='id'
            actionRef={table}
            headerTitle={<Space>
                <Button type="primary" permissions={['system:user:insert']} icon={<PlusOutlined />} onClick={() => openModal('insert', {})}>新增</Button>
                <Deleted 
                    columns={columns} 
                    delete={realDelete} 
                    query={loadDeleteData} 
                    recovery={recovery} 
                    icon={<DeleteOutlined/>}
                    permissions={{ value: ['system:user:select', 'system:user:delete'], allMatch: true }}/>
            </Space>}
            scroll={{ y: 500 }}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            columns={columns.concat(actionColumns)}/>
            { state.open && <SystemUserModal { ...state } onRefresh={reloadTable} onOpenChange={closeModel}/> }
            { dataScope.open && <DataScope { ...dataScope } onClose={closeDataScope}/> }
    </PageContainer>
}

export default SystemUser;