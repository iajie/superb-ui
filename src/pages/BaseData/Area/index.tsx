import { IconFont } from "@/utils/format";
import { PageContainer, ProCard, ProForm, ProFormDigit, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Tree, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import { AllocationPositionProps } from "./props";
import { Button } from "@/components";
import { update, insert as insertArea } from "./props/service";
import { loadAreaData } from "@/utils/dict";
import { treeProps } from "@/utils/tree";

interface OrganState {
    /** 树数据 */
    treeData: any[];
    data: AllocationPositionProps | any;
    /** 展开指定节点 */
    expandedKeys: any[];
    action: 'insert' | 'update';
}

/**
 * 行政区划管理
 * 1. 可设置别名、新增自定义地址
 * 2. 可设置经纬度，便于后续地图中的统计和定位
 * @param props 
 * @returns 
 */
const Organ: React.FC = (props) => {

    const [state, setState] = useState<OrganState>({
        treeData: [],
        action: 'update',
        data: null,
        expandedKeys: [],
    });

    /**
     * 选中区域，默认编辑区域
     * @param keys 
     * @param param1 
     */
    const onSelect = (keys: any[], { node, selected }: any) => {
        setState({ ...state, data: selected ? node : null, action: 'update' });
    }

    /**
     * 重新构造树结构
     * @param list 原数结构
     * @param key 需要重新构造的key
     * @param children 追加子节点
     * @returns 
     */
    const updateTreeData = (list: any[], key: React.Key, children: any[]): any[] => list.map((node) => {
        if (node.id === key) {
            return {
                ...node,
                // 如果最后一层展开无数据，则取消展开节点
                isLeaf: !children.length,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children),
            };
        }
        return node;
    });

    /**
     * 取消勾选
     */
    const cancelData = () => {
        setState({ ...state, data: null, action: 'update' });
    }

    /**
     * 新增行政区划，将选中父节点设置为父级，即新增选中的节点子级
     * @returns 
     */
    const insert = () => {
        if (!state.data) {
            message.warning('请选择行政区划后再新增！');
            return;
        }
        const { data } = state;
        data.parentName = data.name;
        data.parentId = data.id;
        data.level = data.level + 1;
        setState({ ...state, action: 'insert', data: { parentName: data.name, parentId: data.id, level: data.level } });
    }

    /**
     * 右侧区域表单提交
     * @param values 
     */
    const onSubmit = async (values: any) => {
        let res;
        if (state.action == 'update') {
            res = await update({ ...state.data, ...values});
        } else {
            res = await insertArea({...state.data, ...values});
        }
        if (res.success) {
            message.success(res.message);
            loadTree();
        }
    } 

    /**
     * 异步加载子级行政区划
     * @param node 
     */
    const onExpand = async (keys: any[], {expanded, node}: any) => {
        // 展开加载子级，并控制叶子节点展开
        if (expanded) {
            const data = await loadAreaData({ level: node.level + 1, parentId: node.id });
            setState({ ...state, treeData: updateTreeData(state.treeData, node.id, data), expandedKeys: keys });
        } else {
            setState({ ...state, expandedKeys: keys });
        }
    }

    /**
     * 刷新树，会关闭节点，并将表单清空
     */
    const loadTree = async () => {
        const data = await loadAreaData({ level: 1 });
        setState({ ...state, treeData: data, expandedKeys: [], data: null });
    }

    /**
     * 初始化加载区域树
     */
    useEffect(() => {
        loadTree();
    }, []);

    return <PageContainer>
        <ProCard split="vertical" style={{ height: '76vh' }}>
            <ProCard colSpan="25%">
                <Space direction="vertical">
                    <Space>
                        <Button type="primary" size="middle" onClick={insert}>新增区划</Button>
                        <Button type="primary" warning onClick={loadTree}>刷新</Button>
                    </Space>
                    { state.data && <span>当前选中 <span style={{ color: '#f50' }}>{state.data.parentName || state.data.name}</span><Button onClick={cancelData} type="link">取消选中</Button></span> }
                </Space>
                <Tree
                    defaultExpandAll
                    height={620}
                    treeData={state.treeData}
                    fieldNames={treeProps}
                    expandedKeys={state.expandedKeys}
                    onExpand={onExpand}
                    onSelect={onSelect} />
            </ProCard>
            <ProCard>
                {
                    state.data ? <ProForm grid colProps={{ span: 12 }} params={{ data: state.data }} request={async () => state.data || {}} onFinish={onSubmit}>
                        { state.action == 'insert' && <ProFormText disabled name="parentName" label="父级行政区划" /> }
                        <ProFormText disabled={ state.action == 'update' } name='id' label='行政区划代码' rules={[{ required: true, message: '行政区划代码不能为空' }]} placeholder='请输入行政区划代码' />
                        <ProFormText name='name' label='行政区划' rules={[{ required: true, message: '行政区划名称不能为空' }]} placeholder='请输入行政区划名称' />
                        <ProFormText name='shortName' label='简称' placeholder='请输入简称' />
                        <ProFormDigit name='longitude' label='经度' />
                        <ProFormDigit name='latitude' label='纬度' />
                        <ProFormTextArea name='remarks' label='备注' />
                    </ProForm> :
                        <IconFont style={{ fontSize: '300px', display: 'flex', justifyContent: 'center' }} type="icon-zuzhijigouguanli" />
                }
            </ProCard>
        </ProCard>
    </PageContainer>
}

export default Organ;