import React from "react";

export const treeProps = {
	title: 'name',
	key: 'id',
	children: 'children'
}

export const treeSelectProps = {
	label: 'name',
	value: 'id',
	children: 'children'
}


/**
 * 获取树列表
 * @param treeList 将旧的赋值给新的，因为旧的值需要将展示title渲染为element，搜索时会搜索不到
 * @param treeData 旧的值，用于tree展示
 */
export const getTreeList = (treeList: any[], treeData: any) => {
    for (let i in treeData) {
        const node = treeData[i];
        treeList.push(node);
        if (node.children) {
            getTreeList(treeList, node.children);
        }
    }
}

/**
 * 获取父级ID
 * @param id tree 中的key
 * @param tree tree中的treeData属性
 * @returns
 */
// @ts-ignore 
export const getParentId = (id: string, tree: any[]) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item: any) => item.id === id)) {
                parentKey = node.id;
            } else if (getParentId(id, node.children)) {
                parentKey = getParentId(id, node.children);
            }
        }
    }
    return parentKey!;
}

/**
 * 获取搜索需要展开的keys
 * @param searchValue 搜索值
 * @param treeList 搜索的源数组
 * @param treeData tree展示的数组
 */
export const getExpandedKeys = (searchValue: string, treeList: any[], treeData: any[]) => {
    return treeList.map((item: any) => {
        if (item.name.indexOf(searchValue) > -1) {
            return getParentId(item.id, treeData);
        }
        return null;
    }).filter((item, i, self) => !!(item && self.indexOf(item) === i));
}

/**
 * 将tree展示数据格式化
 * @param searchValue 
 * @param treeData 
 * @returns 
 */
export const markTreeData = (searchValue: string, treeData: any[]): any[] => {
    return treeData.map((item: any) => {
        const index = item.name.indexOf(searchValue);
        const beforeStr = item.name.substr(0, index);
        const afterStr = item.name.substr(index + searchValue.length);
        const name = index > -1 ? React.createElement('span', {}, beforeStr, React.createElement('span', { style: { color: '#f50' } }, searchValue), afterStr) : React.createElement('span', {}, item.name);
        if (item.children) {
            return { ...item, name, children: markTreeData(searchValue, item.children) };
        }
        return { ...item, name };
    });
}