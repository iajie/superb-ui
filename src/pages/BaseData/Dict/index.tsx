import React, { useRef, useState } from "react";
import { Space } from "antd";
import AllocationDictModal from "./components";
import { OptionType } from "@/utils/BaseInterface";
import { PlusOutlined } from "@ant-design/icons";
import { columns, loadTableData } from "./props";
import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import DictTable from "./components/DictTable";
import { Button } from "@/components";

/**
 * 数据字典-页面
 * @Author: ajie
 * @CreateTime: 2024-6-18
 */
const AllocationDict: React.FC = () => {
    const table = useRef<ActionType>();
    
    const [state, setState] = useState<any>({
        open: false,
        dictType: ''
    });


    const closeDrawer = () => {
        setState({ ...state, open: false });
    }

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
            width: 300,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                { record.type == 0 && <Button type="text" success onClick={() => setState({ open: true, dictType: record.code, title: record.name })}>字典配置</Button>}
                <AllocationDictModal title='数据字典编辑' type="text" warning formData={record} onRefresh={reloadTable} action="update"/>
                { record.type == 1 && <AllocationDictModal title='新增树型字典类型' type="link" formData={{ parentId: record.id }} onRefresh={reloadTable} action="tree"/> }
            </Space>
        }
    ];
    
    return <PageContainer>
        <ProTable 
            request={loadTableData}
            rowKey='id'
            actionRef={table}
            headerTitle={<Space>
                <AllocationDictModal type="primary" icon={<PlusOutlined />} title='新增数据字典' action="insert" onRefresh={reloadTable}/>
            </Space>}
            scroll={{ y: 475 }}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            columns={columns.concat(actionColumns)}/>
            { state.open && <DictTable {...state} onClose={closeDrawer}/> }
    </PageContainer>
}

export default AllocationDict;