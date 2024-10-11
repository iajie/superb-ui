import React, { useRef } from "react";
import { message as Message } from "antd";
import { insert, update } from "../props/service";
import { OptionType } from "@/utils/BaseInterface";
import { FormInstance, ModalForm, ModalFormProps, ProFormDigit, ProFormGroup, ProFormRadio, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { details } from "../props";
import { dictCode } from "@/utils/dict";
import { ProFormUpload } from "@/components";

interface FormProps extends ModalFormProps {
    /** 刷新表格 */
	onRefresh: () => void;
    /** 操作 */
	action: OptionType;
	/** 操作数据id */
	dataId?: string;
}

/**
 * 系统租户管理-弹出框
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemTenantModal: React.FC<FormProps> = ({ onRefresh, action, dataId, ...props }) => {
    
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
    
    return <ModalForm { ...props } grid readonly={action === 'info'} layout={action ==='info' ? 'horizontal': 'vertical'}
        modalProps={{ maskClosable: false, destroyOnClose: true }} colProps={{ span: 12 }}
        onFinish={onSubmit} formRef={formRef} request={async () => details(dataId)}>
        <ProFormUpload disabled={action == 'info'} style={{ margin: '0px 62px' }} itemProps={{ maxCount: 1 }} deleteSend dir='logo' isCover={false} valueType="key" label='logo' name='logo' />
        <ProFormGroup colProps={{ span: 18 }}>
            <ProFormText label='租户标识' name='tenantKey' disabled={action == 'info' || action == 'update'} rules={[{ required: true, message: '租户标识不能为空' }]}/>
            <ProFormText label='租户名称' name='name' rules={[{ required: true, message: '租户名称不能为空' }]}/>
            <ProFormText label='法人' name='legalPerson' />
            <ProFormText label='联系电话' name='phone' />
        </ProFormGroup>
        <ProFormText label='身份证号' name='idcard' />
        <ProFormText label='银行卡号' name='bankNo' />
        <ProFormText label='开户行' name='bank' />
        <ProFormText label='统一信用代码' name='creditCode' />
        <ProFormText label='企业注册地址' name='registeredAddress' />
        <ProFormRadio.Group label='租户状态' name='status' params={{ dictType: 'status' }} request={dictCode} />
        <ProFormTextArea label='租户页脚配置' name='footer' />
        <ProFormTextArea label='备注' name='remarks' />
    </ModalForm>
}

export default SystemTenantModal;