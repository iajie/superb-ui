import { Button } from "@/components";
import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import React from "react";
import { permissionAction } from "../props/service";
import { message } from "antd";

interface PermissionModalProps {
    formData?: any;
    parentId: string;
    type: number;
    reload: () => void;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({formData, type, parentId, reload}) => {
    return <ModalForm title={`${formData?.id ? '编辑' : '新增'}按钮权限`}
        autoFocusFirstInput
        width={'30%'}
        modalProps={{
            destroyOnClose: true,
        }}
        onFinish={async (values) => {
            values = { ...values, parentId, type };
            const { success } = await permissionAction({ ...formData, ...values});
            if (success) {
                message.success('操作成功！');
                reload();
            }
            return success;
        }}
        request={async() => formData.id ? formData : {}}
        trigger={<Button ghost size="small" type="primary">{formData?.id ? '编辑' : '新增'}</Button>}>
        <ProFormText name='name' label='权限名称' rules={[{required: true, message: '权限名称不能为空'}]}/>
        <ProFormText name='perms' label='权限代码' rules={[{required: true, message: '权限代码不能为空'}]}/>
        <ProFormText name='sort' label='排序' rules={[{required: true, message: '排序不能为空'}]}/>
        <ProFormTextArea name='remarks' label='备注'/>
    </ModalForm>;
}