import React, { useRef, useState } from "react";
import { Space } from "antd";
import SystemRoleModal from "./components";
import { Button, Deleted, OrganTree } from "@/components";
import { OptionType } from "@/utils/BaseInterface";
import { realDelete, recovery } from "./props/service";
import { DeleteOutlined, DeliveredProcedureOutlined, PlusOutlined } from "@ant-design/icons";
import { columns, loadDeleteData, loadTableData, removeById } from "./props";
import { ActionType, PageContainer, ProCard, ProColumns, ProTable } from "@ant-design/pro-components";
import { dictCode } from "@/utils/dict";
import Distribution from "./components/Distribution";

/**
 * 系统角色-页面
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemRole: React.FC = () => {
    const table = useRef<ActionType>();
    
    const [state, setState] = useState<any>({
        title: "",
        open: false,
        action: "",
        dataId: "",
        width: "25%",
    });
    const [organId, setOrganId] = useState<string>();

    const [distribution, setDistribution] = useState<any>({
        open: false,
        title: '',
        roleId: '',
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
            title = "新增系统角色信息";
        } else if (action === 'info') {
            title = "查看系统角色详情";
        } else {
            title = '系统角色信息编辑';
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

    const searchColumns: ProColumns[] = [
        {
            title: '角色类型',
            dataIndex: 'type',
            align: 'center',
            valueType: 'select',
            fieldProps: {
                value: organId ? 1 : 0,
                allowClear: false,
            },
            request: dictCode,
            params: { dictType: 'RoleType' },
            search: true,
            hideInTable: true,
        },
    ]

    const openRoleModal = (record: any) => {
        setDistribution({ open: true, title: `角色[${record.name}]权限`, roleId: record.id });
    }

    const closeRoleModal = () => {
        setDistribution({ open: false });
    }
    
    const actionColumns: ProColumns[] = [
        {
            title: '操作',
            align: 'center',
            search: false,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                <Button permissions={['system:permission:distribution']} title={`角色[${record.name}]权限`} onClick={() => openRoleModal(record)} icon={<DeliveredProcedureOutlined />}>权限分配</Button>
                <Button ghost permissions={['system:role:manage']} warning onClick={() => openModal('update', record)}>编辑</Button>
            </Space>
        }
    ];
    
    return <PageContainer>
        <ProCard split="vertical" title="角色管理" style={{ height: '77vh' }}>
            <ProCard colSpan="20%">
                <OrganTree height={680} onSelect={({selected, node}: any) => setOrganId(selected ? node.id : null)} showSearch/>
            </ProCard>
            <ProCard colSpan="80%">
                <ProTable 
                    request={loadTableData}
                    rowKey='id'
                    actionRef={table}
                    headerTitle={<Space>
                        <Button type="primary" permissions={['system:role:manage']} icon={<PlusOutlined />} onClick={() => openModal('insert', {})}>新增</Button>
                        <Deleted 
                            columns={columns} 
                            delete={realDelete} 
                            query={loadDeleteData} 
                            recovery={recovery} 
                            icon={<DeleteOutlined/>}
                            permissions={{ value: ['system:role:manage'], allMatch: true }}/>
                    </Space>}
                    scroll={{ y: 480 }}
                    params={{ organId }}
                    pagination={{ pageSize: 10, showSizeChanger: false }}
                    columns={searchColumns.concat(columns).concat(actionColumns)}/>
            </ProCard>
        </ProCard>
        { state.open && <SystemRoleModal { ...state } organId={organId} onRefresh={reloadTable} onOpenChange={closeModel}/> }
        { distribution.open && <Distribution { ...distribution } onClose={closeRoleModal} /> }
    </PageContainer>
}

export default SystemRole;