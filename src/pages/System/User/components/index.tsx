/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-06-03 10:43:10
 * @Description: 
 */
import React, { useRef } from "react";
import { message as Message } from "antd";
import { insert, update } from "../props/service";
import { OptionType } from "@/utils/BaseInterface";
import { FormInstance, ModalForm, ModalFormProps, ProFormGroup, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { dictCode } from "@/utils/dict";
import { details } from "../props";
import { ProFormOrganTreeSelect, ProFormUpload } from "@/components";

interface FormProps extends ModalFormProps {
    /** 刷新表格 */
	onRefresh: () => void;
    /** 操作 */
	action: OptionType;
    /** 操作数据id */
	dataId?: string;
}

/**
 * 系统用户-弹出框
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemUserModal: React.FC<FormProps> = ({ onRefresh, action, dataId, ...props }) => {
    
    const formRef = useRef<FormInstance>();
    
    /**
	 * 点击确定
	 */
	const onSubmit = async (values: any) => {
        if (action === 'insert') {
            const { success, message } = await insert(values);
            if (success) {
                Message.success(message);
                if (props.onOpenChange) {
                    props.onOpenChange(false);
                    onRefresh();
                }
            }
        } else if(action === 'update') {
            const { success, message } = await update({ id: dataId, ...values });
            if (success) {
                Message.success(message);
                if (props.onOpenChange) {
                    props.onOpenChange(false);
                    onRefresh();
                }
            }
        } else {
            if (props.onOpenChange) {
                props.onOpenChange(false);
            }
        }
	}
    
    return <ModalForm { ...props } readonly={action === 'info'} grid colProps={{ span: 12 }}
        modalProps={{ maskClosable: false, destroyOnClose: true }}
        onFinish={onSubmit} formRef={formRef} request={async () => details(dataId)}>
        <ProFormUpload style={{ margin: '0px 62px' }} disabled={action == 'info'} fieldProps={{ maxCount: 1, dir: 'avatar', deleteSend: true }} valueType="key" label='头像' name='avatar' />
        <ProFormGroup colProps={{ span: 18 }}>
            <ProFormText colProps={{ span: 24 }} labelAlign='left' label='用户名' name='username' rules={[{ required: true, message: '用户名不能为空' }]}/>
            <ProFormOrganTreeSelect colProps={{ span: 24 }} label="用户所属部门" name="organId" rules={[{ required: true, message: '所属部门不能为空' }]} />
        </ProFormGroup>
        { !dataId && <ProFormText.Password labelAlign='left' label='登录密码' name='password' fieldProps={{ autoComplete: 'new-password' }} rules={[{ required: true, message: '登录密码不能为空' }]}/> }
        <ProFormText labelAlign='left' label='昵称' name='nickname' />
        <ProFormText label='电话号码' name='phoneNumber' rules={[{required: true, message: '电话号码不能为空'}]} />
        <ProFormText label='电子邮箱' name='email' rules={[{type: 'email', message: '请输入正确的邮箱地址'}]} />
        <ProFormText label='身份证号' name='idcard' />
        <ProFormSelect label='性别' name='sex' initialValue={2} params={{ dictType: 'sex' }} request={dictCode}/>
        <ProFormSelect label='租户管理员' name='superb' initialValue={0} params={{ dictType: 'YesNo' }} request={dictCode} rules={[{ required: true, message: '租户管理员不能为空' }]}/>
        <ProFormSelect label='状态' name='status' initialValue={0} params={{ dictType: 'status' }} request={dictCode}/>
    </ModalForm>
}

export default SystemUserModal;