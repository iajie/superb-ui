import { ProFormTreeSelect } from "@ant-design/pro-components";
import React, { useImperativeHandle, useState } from "react";
import { OrganTreeSelectAction, OrganTreeSelectProps } from "./props";
import { treeSelectProps } from "@/utils/tree";
import { treeOrgan } from "@/services/user.service";

/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-07-04 08:35:38
 * @Description: 引用式组件，支持ref调用该组件的暴露方法
 * @params: props 传递属性 ref 引用式方法
 */
export default React.forwardRef<OrganTreeSelectAction, OrganTreeSelectProps>(({ fieldNames = treeSelectProps, value, onChange, checkbox = false, ...props}, ref) => {

    const [state, setState] = useState<any>('');

    /**
     * 加载部门树
     */
    const loadQuery = async () => {
        const res = await treeOrgan();
        if (res.success) {
            return res.result;
        }
        return [];
    }

    useImperativeHandle(ref, () => ({
        reload: () => setState(`${Math.random()}`)
    }));

    return <ProFormTreeSelect 
        params={{state}}
        request={loadQuery}
        fieldProps={{
            treeCheckable: checkbox,
            treeCheckStrictly: checkbox,
            defaultOpen: true,
            fieldNames,
            value,
            onChange,
        }}
        { ...props }/>
});