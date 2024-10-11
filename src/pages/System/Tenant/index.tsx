import React, { useRef, useState } from "react";
import { Dropdown, MenuProps, Space } from "antd";
import SystemTenantModal from "./components";
import TenantConfig from "./components/Config";
import { Button, Deleted } from "@/components";
import { OptionType } from "@/utils/BaseInterface";
import { realDelete, recovery } from "./props/service";
import { DeleteOutlined, DownOutlined, EditOutlined, PicCenterOutlined, PlusOutlined } from "@ant-design/icons";
import { columns, loadDeleteData, loadTableData, removeById, TenantConfigProps } from "./props";
import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";

/**
 * 系统租户管理-页面
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemTenant: React.FC = () => {
    const table = useRef<ActionType>();
    
    const [state, setState] = useState<any>({
        title: "",
        open: false,
        action: "",
        dataId: "",
        width: "50%",
    });

    const [config, setConfig] = useState<TenantConfigProps>({
        open: false,
        title: '',
        tenantId: '',
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
            title = "新增系统租户";
        } else if (action === 'info') {
            title = "查看系统租户详情";
        } else {
            title = '系统租户编辑';
        }
        setState({ ...state, action: action, dataId: row.id, open: true, title: title });
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
    const closeConfigModel = () => {
        setConfig({ ...config, open: false });
    }

    const moreAction = (record: any): MenuProps['items'] => {
        const arr: MenuProps['items'] = [];
        if (global.getAuthority(['system:tenant:select'])) {
            arr.push({
                label: <Button type="link" icon={<EditOutlined />} style={{ width: '100%', textAlign: 'left' }} warning onClick={() => openModal('update', record)}>编辑</Button>,
                key: 'edit',
            });
            arr.push({
                label: <Button type="link" icon={<DeleteOutlined />} style={{ width: '100%', textAlign: 'left' }} danger onClick={() => removeById(record.id, reloadTable)}>删除</Button>,
                key: 'delete',
            });
        }
        if (global.getAuthority(['system:tenant:config'])) {
            arr.push({
                label: <Button type="link" disabled={record.tenantKey==='superb'} icon={<PicCenterOutlined />} style={{ width: '100%', textAlign: 'left' }} onClick={() => {
                    setConfig({ ...config, open: true, title: `[${record.name}]信息管理配置`, tenantId: record.tenantKey });
                }}>租户配置授权</Button>,
                key: 'tenantConfig',
            });
        }
        return arr;
    }
    
    const actionColumns: ProColumns[] = [
        {
            title: '操作',
            align: 'center',
            search: false,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                <Button type="text" permissions={['system:tenant:select']} info onClick={() => openModal('info', record)}>详情</Button>
                <Dropdown menu={{ items: moreAction(record) }} trigger={['click']}>
                    <Button type="link" permissions={['system:tenant:update']} onClick={(e) => e.preventDefault()}>更多<DownOutlined /></Button>
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
                <Button type="primary" permissions={['system:tenant:insert']} onClick={() => openModal('insert', {})} icon={<PlusOutlined />}>新增</Button>
                <Deleted 
                    columns={columns} 
                    delete={realDelete} 
                    query={loadDeleteData} 
                    recovery={recovery} 
                    icon={<DeleteOutlined/>}
                    permissions={{ value: ['system:tenant:select', 'system:tenant:delete'], allMatch: true }}/>
            </Space>}
            scroll={{ y: 500 }}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            columns={columns.concat(actionColumns)}/>
            { state.open && <SystemTenantModal { ...state } onRefresh={reloadTable} onOpenChange={closeModel}/> }
            <TenantConfig { ...config } closeModal={closeConfigModel}/>
    </PageContainer>
}

export default SystemTenant;