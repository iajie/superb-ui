import React, { useRef } from "react";
import { message as Message } from "antd";
import { insertType, updateType, insert, update } from "../props/service";
import { OptionType } from "@/utils/BaseInterface";
import { FormInstance, ModalForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Button, ButtonProps } from "@/components";
import { dictCode } from "@/utils/dict";

interface FormProps extends ButtonProps {
    /** 弹窗标题 */
    title?: string;
    /** 弹窗宽度 */
    width?: string | number;
    /** 刷新表格 */
	onRefresh: () => void;
    /** 操作 */
	action: OptionType | 'tree';
    /** 操作数据id */
	formData?: any;
    /** 是否是字典 */
    dict?: boolean;
}

/**
 * 数据字典-弹出框
 * @Author: ajie
 * @CreateTime: 2024-6-18
 */
const AllocationDictModal: React.FC<FormProps> = ({ onRefresh, action, formData, title, width, dict, ...props }) => {
    
    const formRef = useRef<FormInstance>();
    
    /**
	 * 点击确定
	 */
	const onSubmit = async (values: any) => {
        if (action === 'insert' || action == 'tree') {
            const { success, message } = dict ? await insert({ dictType: formData.parentId , ...values}) : await insertType({ parentId: formData?.parentId , ...values});
            if (success) {
                Message.success(message);
                onRefresh();
            }
            return success;
        } else if(action === 'update') {
            const { success, message } = dict ? await update({ ...formData, ...values}) : await updateType({ id: formData.id, ...values});
            if (success) {
                Message.success(message);
                onRefresh();
            }
            return success;
        } else {
            return true;
        }
	}
    
    return <ModalForm title={title} width={width} grid 
        readonly={action === 'info'} 
        autoFocusFirstInput
        modalProps={{ maskClosable: false, destroyOnClose: true }}
        trigger={<Button {...props}>{props.children ?? (action == 'insert' ? '新增' : action=='update' ? '编辑' : (action == 'tree' ? '新增类型' : '详情'))}</Button>}
        onFinish={onSubmit} formRef={formRef} request={async () => formData ?? {}}>
        <ProFormText label='类型名称' name='name' rules={[{ required: true, message: '类型名称不能为空' }]}/>
        <ProFormText label='字典CODE' name='code' rules={[{ required: true, message: '字典类型不能为空' }]}/>
        <ProFormSelect label='状态' name='status' initialValue={0} request={dictCode} params={{ dictType: 'status' }} />
        <ProFormSelect label='类型' name='type' request={dictCode} params={{ dictType: dict ? 'dictStatus' : 'dictType' }} 
            rules={dict ? [] : [{ required: true, message: '类型不能为空' }]}/>
        <ProFormDigit label='排序' name='sort' fieldProps={{ step: 1, min: 1 }}/>
        <ProFormTextArea label='备注' name='remarks' />
    </ModalForm>
}

export default AllocationDictModal;