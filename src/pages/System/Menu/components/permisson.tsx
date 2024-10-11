import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Drawer, Space } from "antd";
import React, { useRef } from "react"
import { permissionColumns, permissionLoadTableData, removeById } from "../props";
import { Button } from "@/components";
import { PermissionModal } from "./permissionModal";

const MenuPermission: React.FC<{ permissionOpen: boolean; onClose: () => void; type: number; dataId: string; title: string }> = (props) => {

    const table = useRef<ActionType>();
    
    /**
     * 主动刷新表格
     */
    const reloadTable = () => {
        // @ts-ignore
        table.current?.reloadAndRest();
    }

        
    const actionColumns: ProColumns[] = [
        {
            title: '操作',
            align: 'center',
            width: 150,
            search: false,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                <PermissionModal parentId={props.dataId} type={props.type} formData={record} reload={reloadTable}/>
                <Button ghost size="small" permissions={['system:menu:update']} danger onClick={() => removeById(record.id, reloadTable)}>删除</Button>
            </Space>
        }
    ];

    return <Drawer title={`[${props.title}]菜单权限`} destroyOnClose open={props.permissionOpen} width='40%' onClose={props.onClose}>
        <ProTable 
            search={false}
            pagination={false}
            rowKey='id'
            headerTitle={<PermissionModal parentId={props.dataId} type={props.type} reload={reloadTable}/>}
            params={{ id: props.dataId }}
            request={permissionLoadTableData}
            columns={permissionColumns.concat(actionColumns)}
            actionRef={table}/>
    </Drawer>
}

export default MenuPermission;