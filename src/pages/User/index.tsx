import React from "react";
import { Alert, Row, Tabs, TabsProps, message } from "antd";
import { PageContainer, ProCard, ProForm, ProFormText, QueryFilter } from "@ant-design/pro-components";
import { loadUserInfo } from "./props";
import { updateAccount, updateBase, updatePassword } from "./props/service";
import { Button, ProFormUpload } from "@/components";
import { clearCache } from "@/services/user.service";

/**
 * 个人设置
 * @param props 用户个人设置传值
 * @returns 
 */
const UserInfo: React.FC = (props) => {

    const baseMethod = async (fc: Function, params: any, title?: string) => {
        const { code, success } = await fc(params);
        if (success && code == 200) {
            message.success(`${title}更新成功`);
        }
    }

    /**
     * tab选项
     */
    const tabs: TabsProps['items'] | undefined = [
        {
            label: '基础设置',
            key: 'base',
            children: <ProCard bordered={false}>
                <QueryFilter
                    request={loadUserInfo}
                    submitter={{
                        searchConfig: { submitText: '更新' },
                        submitButtonProps: { type: 'link' },
                        resetButtonProps: { type: 'text' },
                    }}
                    onFinish={(values) => baseMethod(updateBase, values, '头像')}>
                    <ProFormUpload
                        name="avatar"
                        label="头像"
                        dir="avatar"
                        deleteSend 
                        isCover={false}
                        fieldProps={{ accept: '.jpg,.png,jpeg' }}
                        valueType="key"
                        rules={[{ required: true, message: '请上传头像' }]}
                    />
                </QueryFilter>
                <QueryFilter
                    request={loadUserInfo}
                    submitter={{
                        searchConfig: { submitText: '更新' },
                        submitButtonProps: { type: 'link' },
                        resetButtonProps: { type: 'text' },
                    }}
                    onFinish={(values) => baseMethod(updateBase, values, '昵称')}>
                    <ProFormText
                        name="nickname"
                        label="昵称"
                        rules={[
                            { required: true, message: '昵称不能为空' },
                        ]}
                    />
                </QueryFilter>
                <QueryFilter
                    request={loadUserInfo}
                    submitter={{
                        searchConfig: { submitText: '更新' },
                        submitButtonProps: { type: 'link' },
                        resetButtonProps: { type: 'text' },
                    }}
                    onFinish={(values) => baseMethod(updateBase, values, '邮箱')}>
                    <ProFormText
                        name="email"
                        label="邮箱"
                        rules={[
                            { required: true, message: '邮箱不能为空' },
                            { type: 'email', message: '请输入正确的邮箱' },
                        ]}
                    />
                </QueryFilter>
                <QueryFilter
                    request={loadUserInfo}
                    submitter={{
                        searchConfig: { submitText: '更新' },
                        submitButtonProps: { type: 'link' },
                        resetButtonProps: { type: 'text' },
                    }}
                    onFinish={(values) => baseMethod(updateBase, values, '手机号')}>
                    <ProFormText
                        name="phoneNumber"
                        label="手机号"
                        rules={[{ required: true, message: '手机号不能为空' }]}
                    />
                </QueryFilter>
                <QueryFilter
                    request={loadUserInfo}
                    submitter={{
                        searchConfig: { submitText: '更新' },
                        submitButtonProps: { type: 'link' },
                        resetButtonProps: { type: 'text' },
                    }}
                    onFinish={(values) => baseMethod(updateBase, values, '身份证号')}>
                    <ProFormText
                        name="idcard"
                        label="身份证号"
                        rules={[{ required: true, message: '身份证号不能为空' }]}
                    />
                </QueryFilter>
            </ProCard>,
        },
        {
            label: '账号设置',
            key: 'Account',
            children: <ProCard bordered={false}>
                <ProForm onFinish={(values) => baseMethod(updateAccount, values, '账号')}>
                    <ProFormText name="username" label="新账号" rules={[{ required: true, message: '请输入新账号' }]} />
                    <ProFormText.Password name="password" fieldProps={{ autoComplete: 'new-password' }} label="帐号密码" rules={[{ required: true, message: '请输入帐号密码' }]} />
                </ProForm>
            </ProCard>
        },
        {
            label: '密码修改',
            key: 'password',
            children: <ProCard bordered={false}>
                <Alert message="密码必须满足(至少8位)、(含数字)、(含小写字母)、(含大写字母)、(含特殊符号)其中两项" type="info" showIcon />
                <ProForm onFinish={(values) => baseMethod(updatePassword, values, '密码')}>
                    <ProFormText.Password name="password" fieldProps={{ autoComplete: 'new-password' }} label="原密码" rules={[{ required: true, message: '请确认新密码' }]} />
                    <ProFormText.Password name="newPassword" label="新密码" rules={[{ required: true, message: '请输入新密码' }]} />
                    <ProFormText.Password name="passwordNewVerify" label="确认密码" dependencies={['newPassword']}
                        rules={[
                            { required: true, message: '请确认密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                    />
                </ProForm>
            </ProCard>
        },
        {
            label: '清除缓存',
            key: 'clearCache',
            children: <ProCard bordered={false}>
                <Alert message="清除系统缓存后，无需重新登录，设置后刷新即刻生效" type="info" showIcon />
                <Row style={{ marginTop: '30px' }}>
                    <Button onClick={() => clearCache()} type="primary">清除缓存</Button>
                </Row>
            </ProCard>
        },
    ];

    return <PageContainer>
        <ProCard style={{ height: '76vh' }}>
            <h2 style={{ textAlign: 'center' }}>个人设置</h2>
            <Row justify={'center'}>
                <Tabs
                    defaultActiveKey="base"
                    destroyInactiveTabPane
                    items={tabs}
                    tabPosition="left"
                    style={{ width: 800 }}
                />
            </Row>
        </ProCard>
    </PageContainer>
}

export default UserInfo;