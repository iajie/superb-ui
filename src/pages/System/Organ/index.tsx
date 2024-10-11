import { IconFont } from "@/utils/format";
import { Tree, Input, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { SystemOrganizationProps, treeQuery } from "./props";
import { dictCode } from "@/utils/dict";
import { Button, ProFormAreaTreeSelect } from "@/components";
import { insert, update } from "./props/service";
import { getExpandedKeys, getTreeList, markTreeData, treeProps } from "@/utils/tree";
import { PageContainer, ProCard, ProForm, ProFormDigit, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";

interface OrganState {
    /** 树数据 */
    treeData: any[];
    data: SystemOrganizationProps | any;
    /** 展开指定节点 */
    expandedKeys: any[];
    action: 'insert' | 'update';
    treeList: any[];
    searchValue: string;
    autoExpandParent: boolean;
}

const Organ: React.FC = (props) => {

    const formRef = React.useRef<ProFormInstance>();

    const [state, setState] = useState<OrganState>({
        treeData: [],
        data: null,
        expandedKeys: [],
        action: 'update',
        treeList: [],
        searchValue: '',
        autoExpandParent: true,
    });

    const onSelect = (keys: any[], { node, selected }: any) => {
        node.area = { label: node.areaName, value: node.areaCode };
        setState({ ...state, data: selected ? node : null, action: 'update' });
    }


    /**
     * 查询树节点
     * @param value
     */
    const searchTree = (value: string) => {
        const { treeData, treeList } = state;
        const expandedKeys = getExpandedKeys(value, treeList, treeData);
        setState({ ...state, expandedKeys, searchValue: value, autoExpandParent: true });
    }

    /**
     * 取消勾选
     */
    const cancelData = () => {
        setState({ ...state, data: null, action: 'update' });
    }

    /**
     * 新增部门，将选中父节点设置为父级，即新增选中的节点子级
     * @returns 
     */
    const insertTo = () => {
        if (!state.data) {
            message.warning('请选择父级部门后再新增！');
            return;
        }
        const { data } = state;
        data.parentName = data.name;
        data.parentId = data.id;
        if (data.type < 2) {
            data.type = data.type + 1;
        }
        setState({ ...state, action: 'insert', data: { parentName: data.name, parentId: data.id, type: data.type } });
    }

    /**
     * 表单提交
     * @param values 
     */
    const onSubmit = async (values: any) => {
        const { label, value } = values.area;
        values.areaCode = value;
        values.areaName = label;
        let res;
        if (state.action == 'update') {
            res = await update({ ...state.data, ...values });
        } else {
            res = await insert({ ...state.data, ...values });
        }
        if (res.success) {
            message.success(res.message);
            loadQuery();
            formRef.current?.resetFields();
        }
    }

    /**
     * 加载部门树
     */
    const loadQuery = async () => {
        const res = await treeQuery();
        const treeList: any[] = [];
        getTreeList(treeList, res);
        setState({ ...state, treeData: res, expandedKeys: [res[0].id], treeList });
    }

    /**
     * 树节点渲染
     * @param data 
     * @returns 
     */
    const mark = (data: any[]): any[] => {
        const { searchValue } = state;
        if (searchValue) {
            return markTreeData(searchValue, data);
        }
        return data;
    }

    useEffect(() => {
        loadQuery();
    }, []);

    return <PageContainer>
        <ProCard split="vertical" style={{ height: '77vh' }}>
            <ProCard colSpan="25%">
                <Space direction="vertical">
                    <Space>
                        <Button type="primary" size="middle" onClick={insertTo}>新增部门</Button>
                        <Button type="primary" warning onClick={loadQuery}>刷新</Button>
                    </Space>
                    {state.data && <span>当前选中 <span style={{ color: '#f50' }}>{state.data.parentName || state.data.name}</span><Button onClick={cancelData} type="link">取消选中</Button></span>}
                </Space>
                <Input.Search style={{ marginBottom: 8, marginTop: 10 }} placeholder="请输入" onSearch={searchTree} />
                <Tree
                    height={680}
                    autoExpandParent={state.autoExpandParent}
                    treeData={mark(state.treeData)}
                    fieldNames={treeProps}
                    expandedKeys={state.expandedKeys}
                    onExpand={(keys: any[]) => setState({ ...state, expandedKeys: keys, autoExpandParent: false })}
                    onSelect={onSelect} />
            </ProCard>
            <ProCard>
                {
                    state.data ? <ProForm grid colProps={{ span: 12 }} formRef={formRef} params={{ data: state.data }} request={async () => state.data || {}} onFinish={onSubmit}>
                        {state.action == 'insert' && <>
                            <ProFormText disabled name="parentName" label="父级部门" />
                        </>}
                        <ProFormText name='name' label='名称' rules={[{ required: true, message: '名称不能为空' }]} placeholder='请输入名称' />
                        <ProFormText name='shortName' label='简称' placeholder='请输入简称' />
                        <ProFormAreaTreeSelect name='area' label='行政区划' rules={[{ required: true, message: '行政区划不能为空' }]} />
                        <ProFormText name='customCode' label='机构编码' placeholder='请输入机构编码(自定义)' />
                        <ProFormDigit name='longitude' label='经度' />
                        <ProFormDigit name='latitude' label='纬度' />
                        <ProFormSelect name='type' label='机构类型' params={{ dictType: 'organizaParentCode' }} request={dictCode} />
                        <ProFormSelect name='parentCode' label='父级标记' params={{ dictType: 'organizaType' }} request={dictCode} />
                        <ProFormTextArea name='address' label='详细地址' />
                        <ProFormTextArea name='remarks' label='备注' />
                    </ProForm> :
                        <IconFont style={{ fontSize: '300px', display: 'flex', justifyContent: 'center' }} type="icon-zuzhijigouguanli" />
                }
            </ProCard>
        </ProCard>
    </PageContainer>
}

export default Organ;