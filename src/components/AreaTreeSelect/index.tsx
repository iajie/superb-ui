import { loadAreaData } from "@/utils/dict";
import { treeSelectProps } from "@/utils/tree";
import { ProFormItemProps, ProFormTreeSelect } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";

interface AreaTreeSelectProps extends ProFormItemProps {
    /**
     * 选中地址事件
     * @param data 返回地址项中所有的数据，包含经纬度等
     * @returns 
     */
    onSelect?: (data: any) => void;
    /** 父级区域 */
    parentCode?: string;
}

/**
 * 区域树异步选择
 * @param param0 
 * @returns 
 */
export default ({  onSelect, parentCode, ...props}: AreaTreeSelectProps) => {

    const [state, setState] = useState<any>({
        treeData: [],
    });

    /**
     * 刷新树，会关闭节点，并将表单清空
     */
    const loadTree = async () => {
        const data = await loadAreaData(parentCode ? { parentId: parentCode } : { level: 1 });
        setState({ ...state, treeData: data, data: null });
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
     * 异步加载子级行政区划
     * @param node 
     */
    const onExpand = async (node: any) => {
        // 展开加载子级，并控制叶子节点展开
        const data = await loadAreaData({ level: node.level + 1, parentId: node.id });
        setState({ ...state, treeData: updateTreeData(state.treeData, node.id, data) });
    }

    /**
     * 初始化加载区域树
     */
    useEffect(() => {
        loadTree();
    }, []);

    return <ProFormTreeSelect { ...props } fieldProps={{
        fieldNames: treeSelectProps,
        treeData: state.treeData,
        loadData: onExpand,
        // 返回值为显示和最终值
        labelInValue: true,
        onSelect: (value, node) => onSelect && onSelect(node),
    }} />
}