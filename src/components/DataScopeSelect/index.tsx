import { dictCode } from "@/utils/dict";
import { DownOutlined } from "@ant-design/icons";
import { ProField } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Dropdown, Space, Tag, Tooltip } from "antd";
import { useState } from "react";
import './index.less';
import { clearCache } from "@/services/user.service";

//DataScopeSelect
export default () => {

    const { initialState } = useModel("@@initialState");

    const { dataScopes, user }: any = initialState;

    //当前数据权限
    const [dataScope, setDataScope] = useState(dataScopes ? dataScopes.find((data: any) => data.organId === localStorage.getItem('organId')) : []);

    const init = dataScopes ? dataScopes.map((scope: any) => {
        return {
            label: <Tooltip placement="left" title={<>数据权限范围：<ProField mode={"read"} text={scope.dataScopeType} valueType="select" params={{ dictType: 'DataScope' }} request={dictCode} /></>}>
                <Space>{scope.organName}
                    {user.organId === scope.organId ? <Tag color="green">所属部门</Tag> : null}
                    {scope.isMain ? <Tag color="cyan">默认</Tag> : null}
                </Space>
            </Tooltip>,
            key: scope.organId,
            disabled: scope.organId === localStorage.getItem('organId'),
        };
    }) : [];

    /**
     * 切换部门
     * @param param0 
     */
    const dataScopeClick = async ({ key }: any) => {
        const dataScope = dataScopes.find((data: any) => data.organId === key);
        localStorage.setItem('organId', dataScope.organId);
        // 清除当前用户缓存
        await clearCache();
        setDataScope(dataScope);
        window.location.reload();
    };

    return <Dropdown menu={{ items: init, onClick: dataScopeClick }} trigger={['click']}>
        <div className="headerSelect">
            <Space>{dataScope?.organName || dataScopes[0].organName}<DownOutlined /></Space>
        </div>
    </Dropdown>
} 