import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Drawer, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { dataScopeColumns, dataScopeLoad } from "../props";
import DataScopeAction from "./DataScopeAction";
import { systemRoleList } from "../props/service";
import { Button } from "@/components";

interface DataScopeProps {
    /** 标题 */
    title?: string;
    open: boolean;
    /** 用户id */
    dataId: string;
    /** 关闭抽屉 */
    onClose: () => void;
}

/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-07-8 
 * @Description: 用户数据权限分配
 */
const DataScope: React.FC<DataScopeProps> = (props) => {

    const table = useRef<ActionType>();

    const [state, setState] = useState<{ roleList: any[]; }>({
        roleList: [],
    });

    const columnsAction: ProColumns[] = [
        {
            valueType: 'option',
            title: '操作',
            align: 'center',
            render: (dom, entity, index, action, schema) => {
                return <Space>
                    <DataScopeAction userId={props.dataId} formData={entity} onReload={reloadTable} roleList={state.roleList} />
                </Space>
            },
        }
    ];

    /**
     * 主动刷新表格
     */
    const reloadTable = () => {
        // @ts-ignore
        table.current?.reloadAndRest();
    }

    useEffect(() => {
        // 初始化获取角色列表
        systemRoleList().then(({success, result}) => {
            if (success) {
                setState({ ...state, roleList: result });
            }
        });   
    }, []);

    return <Drawer title={props.title || '数据权限'} width="40%" open={props.open} onClose={props.onClose}>
        <ProTable
            search={false}
            pagination={false}
            rowKey='id'
            headerTitle={<DataScopeAction userId={props.dataId} formData={{}} onReload={reloadTable} roleList={state.roleList} />}
            params={{ userId: props.dataId }}
            request={dataScopeLoad}
            columns={dataScopeColumns(state, setState, reloadTable).concat(columnsAction)}
            actionRef={table} />
    </Drawer>
}

export default DataScope;