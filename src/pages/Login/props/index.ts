import { validateCode } from "@/services/user.service";
import { MobileOutlined, SafetyOutlined } from "@ant-design/icons";
import { ProFormCaptcha, ProFormText } from "@ant-design/pro-components";
import { message, TabsProps } from "antd";
import React from "react";

/**
 * 登录类型
 */
type LoginState = {
    /** 登录类型 */
    type: 'phone' | 'account' | 'miniCode' | 'phoneCode';
    /** 登录秘钥 */
    key?: string;
    /** 验证码图片 */
    image?: string;
};

/**
 * 登录类型
 */
const typeItems: TabsProps['items'] = [
    {
        key: 'account',
        label: '账号',
    },
    {
        key: 'phone',
        label: '手机号',
    },
    {
        key: 'phoneCode',
        label: '手机验证码',
        children: React.createElement('div', {},
            React.createElement(ProFormText, {
                name: 'phoneNumber',
                placeholder: '请输入手机号',
                rules: [
                    { required: true, message: '请输入手机号' },
                    { pattern: /^1\d{10}$/, message: '手机号格式错误' },
                ],
                fieldProps: {
                    size: 'large',
                    prefix: React.createElement(MobileOutlined),
                }
            }),
            React.createElement(ProFormCaptcha, {
                phoneName: 'phoneNumber',
                name: 'code',
                placeholder: '请输入验证码',
                rules: [{ required: true, message: '请输入验证码' }],
                fieldProps: {
                    size: 'large',
                    prefix: React.createElement(SafetyOutlined),
                },
                onGetCaptcha: async (phoneNumber) => {
                    const { success } = await validateCode(phoneNumber);
                    if (success) {
                        message.success('验证码发送成功！');
                        return Promise.resolve();
                    }
                    return Promise.reject();
                }
            }),
        )
    },
    // {
    //     key: 'miniCode',
    //     label: '小程序扫码登录',
    //     children: React.createElement(QRCode, {
    //         errorLevel: 'H',
    //         value: 'https://ant.design/',
    //         icon: logo,
    //         size: 250
    //     })
    // }
];


export {
    LoginState,
    typeItems
}