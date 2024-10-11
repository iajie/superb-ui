import React, { useRef, useState } from "react";
import { Space } from "antd";
import SystemPermissionModal from "./components";
import { Button, Deleted } from "@/components";
import { OptionType } from "@/utils/BaseInterface";
import { realDelete, recovery } from "./props/service";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { columns, loadDeleteData, loadTableData, removeById } from "./props";
import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import MenuPermission from "./components/permisson";
import { dictCode } from "@/utils/dict";

/**
 * 系统菜单权限-页面
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemPermission: React.FC = () => {
    const table = useRef<ActionType>();
    
    const [state, setState] = useState<any>({
        title: "",
        open: false,
        action: "",
        dataId: "",
        width: "50%",
        permissionOpen: false,
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
            title = "新增系统菜单权限";
        } else if (action === 'info') {
            title = "查看系统菜单权限详情";
        } else {
            title = '系统菜单权限编辑';
        }
        setState({ ...state, action: action, dataId: row.id, open: true, title: title });
    }
    
    /**
     * 打开权限抽屉
     */
    const openMenuPermission = (row: any) => {
        setState({ ...state, dataId: row.id, permissionOpen: true, type: row.type, title: row.name });
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
    const closeMenuPermission = () => {
        setState({ ...state, permissionOpen: false });
    }
    
    const actionColumns: ProColumns[] = [
        {
            title: '操作',
            align: 'center',
            search: false,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                <Button type="text" permissions={['system:menu:update']} warning onClick={() => openModal('update', record)}>编辑</Button>
                { record.menuType == 1 ? <Button type="text" permissions={['system:permission:manage']} onClick={() => openMenuPermission(record)}>权限</Button> : null }
                <Button type="text" permissions={['system:menu:update']} danger onClick={() => removeById(record.id, reloadTable)}>删除</Button>
            </Space>
        }
    ];
    
    return <PageContainer>
        <ProTable 
            request={loadTableData}
            rowKey='id'
            actionRef={table}
            headerTitle={<Space>
                <Button type="primary" permissions={['system:menu:insert']} icon={<PlusOutlined />} onClick={() => openModal('insert', {})}>新增</Button>
                <Deleted 
                    columns={columns.concat([{ title: '类型', dataIndex: 'menuType', valueType: 'select', request: dictCode, params: { dictType: 'MenuLevel' }  }])} 
                    delete={realDelete} 
                    query={loadDeleteData} 
                    recovery={recovery} 
                    icon={<DeleteOutlined/>}
                    permissions={{ value: ['system:menu:select', 'system:menu:delete'], allMatch: true }}/>
            </Space>}
            pagination={false}
            scroll={{ y: 510 }}
            columns={columns.concat(actionColumns)}/>
            { state.open && <SystemPermissionModal { ...state } onRefresh={reloadTable} onOpenChange={closeModel}/> }
            { state.permissionOpen && <MenuPermission {...state} onClose={closeMenuPermission}/> }
    </PageContainer>
}

export default SystemPermission;