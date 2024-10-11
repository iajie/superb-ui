import { Button, ButtonProps } from "@/components";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Modal, Space, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { onlineAction, userOnlineColumns, userOnlineQuery } from "../props";

interface UserOnlineProps extends ButtonProps {
    /** 用户id */
    userId: string;
}

const UserOnline: React.FC<UserOnlineProps> = ({ userId, ...props }) => {

    const [open, setOpen] = useState(false);
    const table = useRef<ActionType>();
    /**
     * 主动刷新表格
     */
    const reloadTable = () => {
        // @ts-ignore
        table.current?.reloadAndRest();
    }

    const actionColumns: ProColumns[] = userOnlineColumns.concat([
        {
            title: '操作',
            align: 'center',
            fixed: 'right',
            render: (dom, entity) => <Space>
                <Tooltip title="注销不会告诉用户(相当于用户主动退出登录)，直接跳转登录">
                    <Button type="text" danger onClick={() => onlineAction(entity.token, 'logout', reloadTable)}>注销</Button>
                </Tooltip>
                <Tooltip title="用户下线后打标记，用户不能正常调用接口，但会提示下线">
                    <Button type="text" warning onClick={() => onlineAction(entity.token, 'kickout', reloadTable)}>下线</Button>
                </Tooltip>
            </Space>,
        }
    ]);

    return <>
        <Button { ...props } onClick={() => setOpen(true)}/>
        <Modal open={open} title='用户在线列表' width='60%' footer={false} onClose={() => setOpen(false)} onCancel={() => setOpen(false)}>
            <ProTable columns={actionColumns} rowKey='token' actionRef={table} params={{ userId }} request={userOnlineQuery} search={false} pagination={false}/>
        </Modal>
    </>
}

export default UserOnline;