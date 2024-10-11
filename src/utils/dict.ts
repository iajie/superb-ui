import { levelQuery } from "@/services/area.service";
import { treeDictTranslate as treeDictTranslateApi, dictTranslate as dictTranslateApi } from "@/services/dict.service";
import { getUrl } from "@/services/upload.service";
import { treeOrgan } from "@/services/user.service";
import { Tag } from "antd";
import React from "react";

const tagColor = (type: number) => {
    switch (type) {
        case 0:
            return 'processing';
        case 1:
            return 'geekblue';
        case 2:
            return 'error';
        case 3:
            return 'warning';
        case 4:
            return 'success';
        default:
            return 'default';
    }
}

/**
 * 普通字典
 * @param params
 */
export const dictCode = async (params: { dictType: string, isTag?: boolean }) => {
    const { success, result } = await dictTranslateApi(params.dictType);
    if (success) {
        return result.filter((i: any) => {
            if (params.isTag) {
                i.label = React.createElement(Tag, { color: tagColor(i.type) }, i.label);
            }
            // 如果为数字则转化为数字
            const value = parseInt(i.value);
            if (!isNaN(value)) {
                i.value = value;
            }
            return true;
        });
    }
    return [];
}

/**
 * 树字典
 * @param params
 */
export const treeDictCode = async (params: { dictType: string }) => {
    const { success, result } = await treeDictTranslateApi(params.dictType);
    if (success) {
        return result;
    }
    return [];
}


/**
 * 查询表格数据
 * @param params 
 */
export const loadAreaData = async (params: any) => {
    const queryParams: any = {
        level: params.level,
        parentId: params.parentId,
        id: params.code,
    };
    const { result } = await levelQuery({ params: queryParams });
    return result.filter((i: any) => {
        i.isLeaf = i.level >= 5;
        return true;
    }) || [];
}


/**
 * 加载部门树
 */
export const loadQuery = async () => {
    const res = await treeOrgan();
    if (res.success) {
        return res.result;
    }
    return [];
}

export const getViewUrl = async ({ key }: any) => {
    const { result } = await getUrl(key, {});
    return result;
}