import { ActionType, ModalForm, ProColumns, ProFormGroup, ProFormSelect, ProFormText, ProTable } from "@ant-design/pro-components";
import React from "react";
import { loadUserTableData, userColumns } from "./props";
import { App, Button } from "antd";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { userAction } from "./props/service";
import { ProFormUpload } from "@/components";
import { dictCode } from "@/utils/dict";

const AdminConfig: React.FC<{ tenantId: string }> = ({ tenantId }) => {

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

    const modalInfo = (record: any) => <ModalForm grid colProps={{ span: 12 }} modalProps={{ maskClosable: false, destroyOnClose: true }}
        title="租户管理员" 
        onFinish={async (values) => {
            const { success } = await userAction({ ...record, ...values, tenantId });
                if (success) {
                    message.success("租户管理员操作成功！");
                    reloadTable();
                }
                return success;
        }}
        trigger={<Button type={record.id ? 'link' : 'primary'} icon={<DeploymentUnitOutlined />}>{ record.id ? '编辑' : '新增' }</Button>}
        request={() => record}>
        <ProFormUpload style={{ margin: '0px 62px' }} fieldProps={{ maxCount: 1, dir: 'avatar', deleteSend: true }} valueType="key" label='头像' name='avatar' />
        <ProFormGroup colProps={{ span: 15 }}>
            <ProFormText label='用户名' colProps={{ span: 24 }} name='username' tooltip="租户管理员默认密码为12345678" rules={[{ required: true, message: '用户名不能为空' }]}/>
            <ProFormText label='电话号码' colProps={{ span: 24 }} name='phoneNumber' rules={[{required: true, message: '电话号码不能为空'}]} />
        </ProFormGroup>
        <ProFormSelect label='性别' name='sex' params={{ dictType: 'sex' }} request={dictCode}/>
        <ProFormText label='昵称' name='nickname' />
        <ProFormText label='电子邮箱' name='email' rules={[{type: 'email', message: '请输入正确的邮箱地址'}]} />
        <ProFormText label='身份证号' name='idcard' />
        <ProFormSelect label='状态' name='status' params={{ dictType: 'status' }} request={dictCode}/>
    </ModalForm>

    return <ProTable 
        actionRef={table}
        rowKey='id'
        headerTitle={modalInfo({ status: 0, sex: 2 })}
        params={{ tenantId }}
        columns={userColumns.concat(actionColumns)}
        pagination={false}
        search={false}
        request={loadUserTableData}/>
}  

export default AdminConfig;