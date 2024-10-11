import { ActionType, PageContainer, ProColumns, ProTable } from "@ant-design/pro-components"
import React from "react"
import { columns, deployment, loadTableData } from "./props";
import { Dropdown, MenuProps, Space } from "antd";
import { Button } from "@/components";
import ModelForm from "./components/ModelForm";
import { ApartmentOutlined, DownOutlined, EditFilled, MergeCellsOutlined, PlusOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";

export default () => {

    const table = React.useRef<ActionType>();
    const reloadTable = () => {
        // @ts-ignore
        table.current?.reloadAndRest();
    }


    const moreAction = (record: any): MenuProps['items'] => {
        const arr: MenuProps['items'] = [];
        arr.push({
            label: <ModelForm type="link" warning onReload={reloadTable} id={record.id} icon={<EditFilled />}>编辑</ModelForm>,
            key: 'edit',
        });
        if (global.getAuthority(['flowable:deployment'])) {
            arr.push({
                label: <Button info type="link" onClick={() => deployment(record.id, reloadTable)} icon={<MergeCellsOutlined />}>部署</Button>,
                key: 'deployment',
            });
        }
        return arr;
    }

    const actionColumns: ProColumns[] = [
        {
            title: '操作',
            align: 'center',
            search: false,
            width: 250,
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                <Button success type="link" permissions={['flowable:model:save']} icon={<ApartmentOutlined />} onClick={() => { history.push('/Flowable/ProcessDesign', { id: record.id }) }}>流程设计</Button>
                <Dropdown menu={{ items: moreAction(record) }} trigger={['click']}>
                    <Button type="link" primary permissions={['flowable:model:save']} onClick={(e) => e.preventDefault()}>更多<DownOutlined /></Button>
                </Dropdown>
            </Space>
        }
    ];

    return <PageContainer>
        <ProTable 
            columns={columns.concat(actionColumns)} 
            actionRef={table}
            headerTitle={<Space>
                <ModelForm type="primary" onReload={reloadTable} permissions={['flowable:model:save']} icon={<PlusOutlined />}>新增模型</ModelForm>
            </Space>}
            search={{
                labelWidth: 95,
            }}
            scroll={{ y: 480 }}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            request={loadTableData} 
            rowKey='id' />
    </PageContainer>
}