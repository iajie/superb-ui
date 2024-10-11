import { HomeTwoTone, LockOutlined, MobileOutlined, SafetyOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProConfigProvider, ProFormText } from "@ant-design/pro-components";
import { FloatButton, Image, Space, Tabs, theme } from "antd";
import React, { useEffect, useState } from "react";
import logo from '@/assets/image/logo.png';
import language from '@/assets/image/language.png';
import { LoginState, typeItems } from "./props";
import { validateImage, pwdLogin, phoneCodeLogin } from "@/services/user.service";
import { history } from '@umijs/max';
import { getToken, setToken } from "@/utils/auth";

const Login: React.FC = () => {
    const [state, setState] = useState<LoginState>({ type: 'account' });
    const { token } = theme.useToken();

    /**
     * 获取验证码
     */
    const getImageCode = async () => {
        const { success, result } = await validateImage('calc');
        if (success) {
            setState({ ...state, key: result.key, image: result.data });
        }
    }

    const login = async (params: any) => {
        const { type, key } = state;
        if (type === 'account' || type === 'phone') {
            const { success, code, result } = await pwdLogin({ ...params, key, type: type === 'account' ? 0 : 1 });
            if (success) {
                setToken(result);
                window.location.href = '/';
            } else {
                await getImageCode();
            }
        } else if (type === 'phoneCode') {
            const { success, result } = await phoneCodeLogin(params);
            if (success) {
                setToken(result);
                window.location.href = '/';
            }
        }
    }

    /**
     * 初始化执行-获取验证码
     */
    useEffect(() => {
        if (getToken()) {
            history.push("/home");
        } else {
            getImageCode();
        }
    }, []);

    return <div style={{ height: '100vh' }}>
        <FloatButton.Group shape="circle">
            <FloatButton icon={<Image src={language} preview={false} />} tooltip='语言切换' />
            <FloatButton icon={<HomeTwoTone />} tooltip='租户切换' />
        </FloatButton.Group>
        <ProConfigProvider dark>
            <LoginFormPage
                onFinish={login}
                backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                logo={logo}
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title="Superb Code"
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0,0.65)',
                    backdropFilter: 'blur(4px)',
                }}
                activityConfig={{
                    style: {
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                        color: token.colorTextHeading,
                        borderRadius: 8,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(4px)',
                    },
                    title: 'Superb Code',
                    // subTitle: '寻找为爱发电的伙伴，共同开发Superb易码平台！',
                    action: '联系方式：ajie20999@163.com'
                }}>
                <Tabs onChange={(key: any) => setState({ ...state, type: key })} items={typeItems} />
                {(state.type === 'account' || state.type === 'phone') && <>
                    <ProFormText
                        name='username'
                        placeholder={state.type === 'account' ? '登录名: admin or user' : '请输入手机号'}
                        fieldProps={{
                            size: 'large',
                            prefix: state.type === 'account' ? <UserOutlined /> : <MobileOutlined />
                        }}
                        rules={[{ required: true, message: '请输入登录账号' }]} />
                    <ProFormText.Password
                        name='password'
                        placeholder='密码'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined />
                        }}
                        rules={[{ required: true, message: '请输入密码' }]} />
                    <Space direction="horizontal">
                        <ProFormText
                            placeholder='请输入验证码'
                            fieldProps={{
                                size: 'large',
                                prefix: <SafetyOutlined />,
                            }}
                            rules={[{ required: true, message: '请输入密码' }]}
                            name='code' />
                        {state.image && <Image style={{ marginTop: '-26px', borderRadius: '8px' }} preview={false} onClick={getImageCode} src={state.image} />}
                    </Space>
                </>}
                <div style={{ marginBlockEnd: 24 }}>
                    <a style={{ float: 'right' }}>忘记密码</a>
                </div>
            </LoginFormPage>
        </ProConfigProvider>
    </div>;

}

export default Login;