import React, { useRef, useState } from "react";
import { message as Message } from "antd";
import { details, parentMenuSearch } from "../props";
import { insert, update } from "../props/service";
import { AliIcon, OptionType } from "@/utils/BaseInterface";
import { FormInstance, ModalForm, ModalFormProps, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { dictCode } from "@/utils/dict";

interface FormProps extends ModalFormProps {
    /** 刷新表格 */
	onRefresh: () => void;
    /** 操作 */
	action: OptionType;
    /** 操作数据id */
	dataId?: string;
    /** 权限弹窗 */
    permissionOpen?: boolean;
}

/**
 * 系统菜单权限-弹出框
 * @Author: ajie
 * @CreateTime: 2024-6-3
 */
const SystemPermissionModal: React.FC<FormProps> = ({ onRefresh, action, dataId, permissionOpen, ...props }) => {
    
    const formRef = useRef<FormInstance>();

    const [state, setState] = useState<any>({ type: null, menuType: 0 });
    
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
        <ProFormSelect label='菜单类型' name='type' params={{ dictType: 'MenuType' }} request={dictCode}
            onChange={(e) => setState({ ...state, type: e })}
            rules={[{ required: true, message: '菜单类型不能为空' }]}/>
        <ProFormSelect label='菜单属性' name='menuType' onChange={(e) => setState({ ...state, menuType: e })} params={{ dictType: 'MenuLevel' }} request={dictCode} rules={[{ required: true, message: '菜单属性不能为空' }]}/>
        <ProFormText label='名称' name='name' rules={[{ required: true, message: '名称不能为空' }]}/>
        <ProFormText label='菜单路由' name='path' />
        <ProFormText label='组件名称' name='component' />
        <ProFormSelect label='菜单图标' name='icon' options={AliIcon} showSearch/>
        { (state.menuType == 1) ? <ProFormSelect label='父级菜单' name='parentId' params={{ type: state.type }} request={parentMenuSearch} rules={[{ required: true, message: '父级菜单不能为空' }]} /> : null }
        <ProFormRadio.Group label='外链' name='outerChain' initialValue={0} params={{ dictType: 'YesNo' }} request={dictCode} />
        <ProFormRadio.Group label='状态' name='status' initialValue={0} params={{ dictType: 'status' }} request={dictCode} />
        <ProFormDigit label='排序' name='sort' rules={[{ required: true, message: '排序不能为空' }]}/>
        <ProFormTextArea label='备注' name='remarks' />
    </ModalForm>
}

export default SystemPermissionModal;