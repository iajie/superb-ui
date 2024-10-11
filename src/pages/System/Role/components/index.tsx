import React, { useRef } from "react";
import { message as Message } from "antd";
import { details } from "../props";
import { insert, update } from "../props/service";
import { OptionType } from "@/utils/BaseInterface";
import { FormInstance, ModalForm, ModalFormProps, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { dictCode } from "@/utils/dict";

interface FormProps extends ModalFormProps {
    /** 刷新表格 */
	onRefresh: () => void;
    /** 操作 */
	action: OptionType;
    /** 操作数据id */
	dataId?: string;
    /** 部门id，新增选中部门时生效 */
    organId?: string;
}

/**
 * 系统角色-弹出框
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemRoleModal: React.FC<FormProps> = ({ onRefresh, action, dataId, organId, ...props }) => {
    
    const formRef = useRef<FormInstance>();
    
    /**
	 * 点击确定
	 */
	const onSubmit = async (values: any) => {
        if (action === 'insert') {
            if (values.type == 1) {
                if (!organId) {
                    Message.warning('请选择部门后新增！');
                    return;
                }
                values.organId = organId;
            }
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
    
    return <ModalForm { ...props } grid readonly={action === 'info'} 
        modalProps={{ maskClosable: false, destroyOnClose: true }}
        onFinish={onSubmit} formRef={formRef} request={async () => details(dataId)}>
        <ProFormText label='角色名称' name='name' rules={[{ required: true, message: '角色名称不能为空' }]}/>
        <ProFormText label='角色代码' name='code' rules={[{ required: true, message: '角色代码不能为空' }]}/>
        <ProFormSelect label='角色类型' name='type' params={{ dictType: 'RoleType' }} request={dictCode} rules={[{ required: true, message: '角色类型不能为空' }]}/>
        <ProFormDigit label='排序' name='sort' rules={[{ required: true, message: '排序不能为空' }]}/>
        <ProFormRadio.Group label='状态' name='status' initialValue={0} params={{ dictType: 'status' }} request={dictCode} />
        <ProFormTextArea label='备注' name='remarks' />
    </ModalForm>
}

export default SystemRoleModal;