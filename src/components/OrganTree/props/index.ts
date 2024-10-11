
export interface OrganTreeProps {
    /** 树高度 */
    height?: number;
    /** 选中数据 */
    onSelect?: (data: any) => void;
    /** 是否展示搜索 */
    showSearch?: boolean;
}

export interface OrganTreeType {
    /** 树展示数据 */
    treeData: any[]; 
    /** 展开项，受控的 */
    expandedKeys: any[]; 
    /** 树原始数据 */
    treeList: any[] 
    /** 搜索值 */
    searchValue?: string;
    /** 是否自动展开父节点 */
    autoExpandParent: boolean;
}