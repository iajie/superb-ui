import React, { useEffect, useState } from "react";
import { Input, Space, Tree } from "antd";
import { treeOrgan } from "@/services/user.service";
import { getExpandedKeys, getTreeList, markTreeData, treeProps } from "@/utils/tree";
import { OrganTreeType, OrganTreeProps } from "./props";

export default ({ height, onSelect, ...props }: OrganTreeProps) => {

    const [state, setState] = useState<OrganTreeType>({
        treeData: [],
        expandedKeys: [],
        treeList: [],
        autoExpandParent: false,
        searchValue: ''
    });

    /**
     * 加载部门树
     */
    const loadQuery = async () => {
        const res = await treeOrgan();
        if (res.success) {
            const data = res.result;
            const treeList: any[] = [];
            getTreeList(treeList, data);
            setState({ ...state, treeData: data, treeList, expandedKeys: [res.result.id] });
        }
    }
    
    /**
     * 查询树节点
     * @param value
     */
    const searchTree = (value: string) => {
        if (!value) {
            setState({ ...state, expandedKeys: [state.treeData[0].id], searchValue: value, autoExpandParent: false });
        } else {
            const { treeData, treeList } = state;
            const expandedKeys = getExpandedKeys(value, treeList, treeData);
            setState({ ...state, expandedKeys, searchValue: value, autoExpandParent: true });
        }
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

    return <Space direction="vertical">
        { props.showSearch && <Input.Search placeholder="请输入" onSearch={searchTree} /> }
        <Tree
            expandedKeys={state.expandedKeys}
            height={height}
            autoExpandParent={state.autoExpandParent}
            treeData={mark(state.treeData)}
            fieldNames={treeProps}
            onExpand={(keys) => setState({ ...state, expandedKeys: keys, autoExpandParent: false })}
            onSelect={(keys, info) => onSelect && onSelect(info)} />
    </Space>
}