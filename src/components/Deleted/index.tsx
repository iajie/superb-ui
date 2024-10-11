import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Modal, Space, message } from "antd";
import React, { useRef, useState } from "react";
import { Button } from "../";
import { DeleteOutlined, RedoOutlined } from "@ant-design/icons";

interface DeletedModalProps {
    /** 表格列 */
    columns: ProColumns[];
    /** 回收站查询 */
    query: () => Promise<any>;
    /** 数据恢复 */
    recovery: (batchId: string[]) => Promise<any>;
    /** 数据删除 */
    delete: (batchId: string[]) => Promise<any>;
    /** 权限集合 */
    permissions: string[] | {
        /** 权限集合 */
        value: string[];
        /** 是否全匹配 */
        allMatch?: boolean;
    };
    /** 弹出框标题，默认回收站 */
    deleteTitle?: string;
    /** 按钮文字 */
    text?: string;
    icon?: React.ReactNode;
}

const Deleted: React.FC<DeletedModalProps> = ({ columns, query, permissions, ...props }) => {

    const table = useRef<ActionType>();
    const [state, setState] = useState<{ open: boolean; batchId: string[] }>({
        open: false,
        batchId: [],
    });

    /**
     * 主动刷新表格
     */
    const reloadTable = () => {
        // @ts-ignore
        table.current?.reloadAndRest();
    }

    const actionRecovery = (batchId: string[]) => {
        const modal = Modal.confirm({
            title: '提示',
            content: '是否恢复数据？',
            onOk: async () => {
                const { success } = await props.recovery(batchId);
                if (success) {
                    message.success('数据恢复成功！');
                    modal.destroy();
                    reloadTable();
                }
            }
        });
    }

    const actionDelete = (batchId: string[]) => {
        const modal = Modal.confirm({
            title: '提示',
            content: '是否彻底删除数据？删除后数据将无法恢复！',
            onOk: async () => {
                const { success } = await props.delete(batchId);
                if (success) {
                    message.success('数据删除成功！');
                    modal.destroy();
                    reloadTable();
                }
            }
        });
    }

    /**
     * 操作按钮
     */
    const actionColumns: ProColumns[] = [
        {
            title: '操作',
            align: 'center',
            fixed: 'right',
            render: (dom: any, record: any) => <Space size={1}>
                <Button type="link" onClick={() => actionRecovery([record.id])} icon={<RedoOutlined />} success>还原</Button>
                <Button type="link" onClick={() => actionDelete([record.id])} icon={<DeleteOutlined/>} danger>彻底删除</Button>
            </Space>
        }
    ];

    return <>
        <Button permissions={permissions} icon={props.icon} onClick={() => setState({ ...state, open: true })} info>{ props.text || '回收站'}</Button>
        { state.open && <Modal 
            width={'70%'}
            onCancel={() => setState({ ...state, open: false })}
            open={state.open} 
            title={props.deleteTitle || '回收站'} 
            footer={false}>
            <ProTable 
                actionRef={table}
                rowKey='id'
                rowSelection={{
                    alwaysShowAlert: false,
                    onChange: (selectedRowKeys: any) => {
                        setState({ ...state, batchId: selectedRowKeys });
                    },
                }}
                pagination={false}
                search={false}
                tableAlertOptionRender={() => <Space size={16}>
                    <Button type="text" onClick={() => actionRecovery(state.batchId)} success>批量还原</Button>
                    <Button type="text" danger onClick={() => actionDelete(state.batchId)}>批量删除</Button>
                </Space>}
                request={query}
                columns={columns.concat(actionColumns)}/>
        </Modal> }
    </>
}

export default Deleted;