import { ModalForm, ProFormItem, ProFormRadio, ProFormSelect } from "@ant-design/pro-components";
import React, { useState } from "react";
import { dataScopeInsert, dataScopeUpdate } from "../props/service";
import { message, Tooltip, Transfer } from "antd";
import { Button, ProFormOrganTreeSelect } from "@/components";
import { dictCode } from "@/utils/dict";

interface DataScopeActionProps {
    /** 表单信息 */
    formData?: any;
    /** 用户id */
    userId: string;
    /** 刷新数据权限表格 */
    onReload: () => void;
    /** 角色列表，穿梭框数据 */
    roleList: any[];
}

interface DataScopeActionModel {
    /** 穿梭框选中数据 */
    targetKeys: any[];
    /** 数据权限是否自定义 */
    isCustom: boolean;
}

const DataScopeAction: React.FC<DataScopeActionProps> = ({userId, formData, onReload, roleList = []}) => {

    const [state, setState] = useState<DataScopeActionModel>({
        targetKeys: formData?.roleIds ?? [],
        isCustom: formData?.dataScopeType ? formData?.dataScopeType == 4 : false,
    });

    return <ModalForm 
        title="数据权限操作" 
        modalProps={{
            destroyOnClose: true,
        }}
        onFinish={async (values) => {
            values = { ...values, userId };
            let response;
            if (formData.id) {
                response = await dataScopeUpdate({ ...formData, ...values});
            } else {
                response = await dataScopeInsert({ ...values });
            }
            if (response.success) {
                message.success('操作成功！');
            }
            onReload();
            return response.success;
        }}
        request={async() => formData.id ? formData : { enable: 0, isMain: 0 }}
        trigger={<Button ghost size="small" type="primary">{formData?.id ? '编辑' : '新增'}</Button>}
        width="35%" grid colProps={{ span: 12 }}>
        <ProFormOrganTreeSelect label="用户所属部门" tooltip="数据权限部门所包含的角色会在选择部门添加后应用" name="organId" rules={[{ required: true, message: '所属部门不能为空' }]} />
        <ProFormSelect label="数据权限范围" name="dataScopeType" params={{ dictType: 'DataScope' }} onChange={(e) => setState({ ...state, isCustom: e == 4 })} request={dictCode} rules={[{ required: true, message: '数据权限范围不能为空' }]}/>
        { state.isCustom && <>
            <ProFormOrganTreeSelect 
                label="自定义部门权限" 
                checkbox 
                name="organs" 
                tooltip="自定义权限最多可选择20个部门(最终提交的部门不为勾选部门，是下拉显示选中的值)" 
                rules={[
                    { required: true, message: '自定义部门权限不能为空' },
                    { type: 'array', max: 20, message: '自定义权限最多可选择20个部门' }
                ]}/>
            <ProFormSelect label="自定义部门权限范围" name="dataScopeOrganType" params={{ dictType: 'DataScopeOrgan' }} request={dictCode} rules={[{ required: true, message: '数自定义部门权限范围不能为空' }]}/>
        </> }
        <ProFormItem label="系统角色" name="roleIds" tooltip="最多可选择10个系统角色" rules={[{ type: 'array', max: 10, message: '最多可选择10个系统角色' }]}>
            <Transfer 
                dataSource={roleList} 
                rowKey={(record) => record.id}
                titles={['未拥有', '已拥有']}
                targetKeys={state.targetKeys}
                onChange={(targetKeys) => setState({ ...state, targetKeys})}
                listStyle={{ width: 295, height: 200 }}
                render={(item)=> <Tooltip title={item.remarks} placement="topLeft" arrow={{ pointAtCenter: true }}>
                    <Button type="link" style={{ color: '#391085' }}>{item.name}</Button>
                </Tooltip>} />
        </ProFormItem>
        <ProFormRadio.Group label="是否默认" name="isMain" params={{ dictType: 'YesNo' }} request={dictCode}/>
        <ProFormRadio.Group label="状态" name="enable" params={{ dictType: 'status' }} request={dictCode}/>
    </ModalForm>
}

export default DataScopeAction;