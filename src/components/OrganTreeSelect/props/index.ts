/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-07-04 08:56:50
 * @Description: 
 */
import { ProFormItemProps } from "@ant-design/pro-components";
import { TreeSelectProps } from "antd";

/**
 * tree字段属性
 */
interface FieldNames {
    /** 选中值 */
    value?: string;
    /** 显示值 */
    label?: string;
    /** 子级 */
    children?: string;
}

export interface OrganTreeSelectProps extends ProFormItemProps<TreeSelectProps> {
    /** 配合自定义搜索组件 */
    value?: { key: string; label: string; }[];
    /** 配合自定义搜索组件 */
    onChange?: ( value: { key: string; label: string; }[]) => void;
    /** 树形数据 */
    treeData?: [];
    /** 属性属性指定 */
    fieldNames?: FieldNames;
    /** 是否为多选状态 */
    checkbox?: boolean;
}

export interface OrganTreeSelectAction {
    /** 主动刷新树 */
    reload: () => void;
}