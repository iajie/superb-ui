import { Button, ButtonProps } from "@/components"
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components"
import { details } from "../props";
import { save } from "../props/service";
import { message } from "antd";
import { dictCode } from "@/utils/dict";

interface actionProps extends ButtonProps {
    /** 数据id */
    id?: string;
    /** 刷新数据权限表格 */
    onReload: () => void;
}

export default ({id, onReload, ...props}: actionProps) => {

    return <ModalForm 
        title={`${id ? '修改' : '新增'}流程模型` } 
        width="35%" grid
        request={async() => id ? details(id) : {}}
        modalProps={{ destroyOnClose: true }}
        onFinish={async (values) => {
            const { success } = await save({ ...values, id });
            if (success) {
                message.success('操作成功！');
            }
            onReload();
            return success;
        }}
        trigger={<Button {...props}/>}>
        <ProFormText name='name' label='流程模型名称' rules={[{ required: true, message: '流程模型名称不能为空' }]}/>
        <ProFormText name='key' label='流程模型标识' rules={[{ required: true, message: '流程模型标识不能为空' }]}/>
        <ProFormSelect name='modelType' label='流程分类' params={{ dictType: 'flowType' }} request={dictCode} rules={[{ required: true, message: '流程分类不能为空' }]}/>
        <ProFormTextArea name='remarks' label='备注' />
    </ModalForm>

}