import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Drawer, Space } from "antd";
import React, { useRef } from "react";
import { dictColumns, loadDictTableData } from "../props";
import AllocationDictModal from "./index";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "@/components";

interface DictTableProps {
    open: boolean;
    dictType: string;
    title: string;
    onClose: () => void;
}

const DictTable: React.FC<DictTableProps> = ({ open, dictType, title, ...props }) => {

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
            search: false,
            width: 120,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                <AllocationDictModal title='数据字典配置项编辑' dict type="text" warning formData={record} onRefresh={reloadTable} action="update"/>
            </Space>
        }
    ];

    return <Drawer title={title+'-字典管理'} open={open} destroyOnClose width='40%' onClose={props.onClose}>
        <ProTable 
            headerTitle={<Space>
                <AllocationDictModal dict type="primary" icon={<PlusOutlined />} formData={{ parentId: dictType }} title='新增数据字典' action="insert" onRefresh={reloadTable}/>
            </Space>}
            actionRef={table}
            rowKey='id'
            params={{ dictType }}
            request={loadDictTableData}
            columns={dictColumns.concat(actionColumns)}/>
    </Drawer>
}

export default DictTable;