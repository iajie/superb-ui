import React from "react";
import { Button } from "@/components";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import { columns, deleteDeploymentById, deploymentStateSet, loadFlowUser, loadTableData } from "./props";
import { ActionType, DrawerForm, PageContainer, ProColumns, ProField, ProList, ProTable } from "@ant-design/pro-components";
import { DeleteColumnOutlined, DeleteOutlined, DownOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { userOption } from "../ProcessDesign/props";
import { loadPicture } from "./props/service";

export default () => {

    const table = React.useRef<ActionType>();
    const reloadTable = () => {
        // @ts-ignore
        table.current?.reloadAndRest();
    }

    const moreAction = (record: any): MenuProps['items'] => {
        const arr: MenuProps['items'] = [];
        if (global.getAuthority(['flowable:deployment:delete'])) {
            arr.push({
                label: <Button danger type="link" onClick={() => deleteDeploymentById(record.id, reloadTable)} icon={<DeleteOutlined />}>删除定义</Button>,
                key: 'delete',
            });
        }
        if (global.getAuthority(['flowable:process:list'])) {
            arr.push({
                label: <Button type="link" onClick={() => {}} icon={<DeleteColumnOutlined />}>流程实例</Button>,
                key: 'process',
            });
            arr.push({
                label: <DrawerForm 
                    title={`${record.name}-用户任务节点`} 
                    trigger={<Button type="link" info icon={<UserOutlined />}>用户任务节点</Button>}
                    submitter={{ render: false }}>
                    <ProList 
                        headerTitle={<Button onClick={() => loadPicture(record.processDefinitionId)}>查看流程图</Button>}
                        params={{ flowKey: record.key }}
                        request={loadFlowUser} 
                        metas={{
                            title: {
                                dataIndex: 'name'
                            },
                            subTitle: {
                                dataIndex: 'id'
                            },
                            extra: {
                                dataIndex: 'assignee',
                                render: (dom: any) => {
                                    return <ProField mode="read" valueType='select' text={dom} request={userOption} />
                                }
                            },
                        }}/>
                </DrawerForm>,
                key: 'user',
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
                <Button warning={record.suspensionState == 1} type="link" 
                    success={record.suspensionState != 1}
                    permissions={['flowable:deployment:state']} 
                    icon={<SettingOutlined />} 
                    onClick={() => deploymentStateSet(record.processDefinitionId, record.suspensionState, reloadTable)}>{record.suspensionState == 1 ? '终止' : '激活'}</Button>
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
            search={{
                labelWidth: 95,
            }}
            scroll={{ y: 480 }}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            request={loadTableData} 
            rowKey='id' />
    </PageContainer>
}