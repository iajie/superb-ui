import { App, Space } from "antd";
import { Button } from "@/components";
import React, { useRef, useState } from "react";
import { synchronization } from "./props/service";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { columns, loadTableData, menuOptions, removeById, tenantOptions } from "./props";
import { ActionType, ModalForm, ProColumns, ProFormCheckbox, ProFormSelect, ProTable } from "@ant-design/pro-components";

const MenuConfig: React.FC<{ tenantId: string }> = ({ tenantId }) => {

    const table = useRef<ActionType>();
    const { message } = App.useApp();

    const [state, setState] = useState<any>({
        checkTenant: '',
    });

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
            fixed: 'right',
            render: (dom: any, record: any) => <Space>
                {(!record.children || record.children.length == 0) && <Button type="text" danger onClick={() => removeById(record.id, reloadTable)}>删除</Button>}
            </Space>
        }
    ];

    return <ProTable
        request={loadTableData}
        rowKey='id'
        actionRef={table}
        search={false}
        params={{ tenantId }}
        headerTitle={<Space>
            <ModalForm title="数据同步[同步时会将租户菜单信息清空，请谨慎操作]"
                onFinish={async (values) => {
                    const { success } = await synchronization(values, tenantId);
                    if (success) {
                        message.success("菜单同步成功！");
                        reloadTable();
                    }
                    return success;
                }}
                trigger={<Button type="primary" icon={<DeploymentUnitOutlined />}>同步</Button>}>
                <ProFormSelect label="同步租户" name="tenantId"
                    request={tenantOptions} onChange={(value) => setState({ ...state, checkTenant: value })}
                    rules={[{ required: true, message: '同步租户不能为空' }]} />
                {state.checkTenant && <ProFormCheckbox.Group
                    label="租户父级菜单" name="id"
                    params={{ tenantId: state.checkTenant }}
                    request={menuOptions}
                    rules={[{ required: true, message: '同步租户菜单不能为空' }]} />}
            </ModalForm>
        </Space>}
        pagination={false}
        scroll={{ y: 450 }}
        columns={columns.concat(actionColumns)} />
}

export default MenuConfig;