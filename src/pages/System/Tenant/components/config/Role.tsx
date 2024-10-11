import { ActionType, ModalForm, ProColumns, ProFormDigit, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components";
import React, { useState } from "react";
import { loadRoleTableData, loadTableData, roleColumns } from "./props";
import { App, Button } from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { roleAction } from "./props/service";

const RoleConfig: React.FC<{ tenantId: string }> = ({ tenantId }) => {

    const [state, setState] = useState<any>({
        treeData: []
    });
    const table = React.useRef<ActionType>();
    const { message } = App.useApp();

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
            render: (dom: any, record: any) => modalInfo(record)
        }
    ];

    const modalInfo = (record: any) => <ModalForm 
        title="系统角色管理" 
        onFinish={async (values) => {
            const { success } = await roleAction({ ...record, ...values });
                if (success) {
                    message.success("系统角色操作成功！");
                    reloadTable();
                }
                return success;
        }}
        width="20%"
        trigger={<Button type={record.id ? 'link' : 'primary'} icon={<DeploymentUnitOutlined />}>{ record.id ? '编辑' : '新增' }</Button>}
        request={() => record}>
        <ProFormText label='角色名称' name='name' rules={[{ required: true, message: '角色名称不能为空' }]}/>
        <ProFormText label='角色代码' name='code' rules={[{ required: true, message: '角色代码不能为空' }]}/>
        <ProFormDigit label='排序' name='sort' rules={[{ required: true, message: '排序不能为空' }]}/>
        <ProFormTextArea label='备注' name='remarks' />
    </ModalForm>

    React.useEffect(() => {
        loadTableData({ tenantId }).then((res) => {
            setState({ ...state, treeData: res.data })
        });
    }, []);

    return <ProTable 
        style={{ width: '70vw' }}
        actionRef={table}
        rowKey='id'
        headerTitle={modalInfo({})}
        params={{ tenantId }}
        columns={roleColumns.concat(actionColumns)}
        pagination={false}
        search={false}
        request={loadRoleTableData}/>
}  

export default RoleConfig;