import { Button } from "@/components";
import { ReloadOutlined, SaveOutlined } from "@ant-design/icons";
import { CheckCard, PageContainer, ProCard, ProForm, ProFormInstance, ProFormItem, ProFormRadio } from "@ant-design/pro-components";
import { App, Tooltip } from "antd";
import React, { useRef } from "react";
import { ColorPicker, RadiusPicker } from "./components";
import { Color } from "antd/es/color-picker";
import { compactOptions, THEMELIST, themeOptions } from "./props";
import { useModel, useDispatch, useSelector } from "@umijs/max";
import { updateBase } from "../User/props/service";

/**
 * 主题类型定义
 */
interface ThemeData {
    themeType: 'default' | 'dark' | 'lark' | 'comic';
    colorPrimary: Color | string;
    borderRadius: number;
    compact?: 'default' | 'compact';
}


const ThemeSetting: React.FC = () => {

    const form = useRef<ProFormInstance>();
    //Redux请求
    const dispatch = useDispatch();
    const { message } = App.useApp();
    // 获取全局主题
    const { userTheme } = useSelector((state: { userTheme: any }) => state);
    const { initialState } = useModel('@@initialState');
    const { remarks } = initialState?.user || {};
    const onThemeChange = (_: Partial<ThemeData>, nextThemeData: ThemeData) => {
        // 页面排版
        const theme = THEMELIST.find(i => i.theme === nextThemeData.themeType);
        // 主题颜色
        const colorBgLayout = theme?.colorBgLayout || 'rgb(237 241 247 / 79%)';
        form.current?.setFieldValue('colorBgLayout', colorBgLayout);
        let colorPrimary = theme?.color || '#1677ff';
        if (nextThemeData.colorPrimary) {
            if (typeof nextThemeData.colorPrimary != 'string') {
                colorPrimary = nextThemeData.colorPrimary.toHexString();
            } else {
                colorPrimary = nextThemeData.colorPrimary;
            }
        }
        // 圆角
        const borderRadius = nextThemeData.borderRadius || 6;
        // 宽松度
        const compact = nextThemeData.compact || 'default';
        const themeData = {
            colorBgLayout,
            colorPrimary,
            borderRadius,
            compact,
            themeType: nextThemeData.themeType
        };
        dispatch({
            type: 'userTheme/setThemeData',
            payload: {
                themeData
            }
        });
    }

    const onSubmit = async () => {
        const values = form.current?.getFieldsValue();
        values.themeType ? values.themeType : values.themeType = 'default';
        const { success } = await updateBase({ remarks: JSON.stringify({ ...remarks, themeData: values }) });
        if (success) {
            message.success('主题保存成功！');
        }
    }

    const onReset = async () => {
        const themeData = { themeType: 'default', colorPrimary: '#1677FF', borderRadius: 6, compact: 'default', colorBgLayout: 'rgb(237 241 247 / 79%)',  };
        const { success } = await updateBase({ remarks: JSON.stringify({ ...remarks, themeData }) });
        if (success) {
            dispatch({
                type: 'userTheme/setThemeData',
                payload: {
                    themeData
                }
            });
            message.success('主题重置成功！');
            form.current?.resetFields();
        }
    }

    return <PageContainer>
        <ProCard
            bodyStyle={{ height: 'calc(100vh - 320px)' }}
            actions={[<div style={{ padding: 12 }}> 
                <Button type="primary" onClick={onSubmit} icon={<SaveOutlined />}>保存主题</Button> 
                <Tooltip title="恢复为初始化状态">
                    <Button onClick={onReset} style={{ marginLeft: '20px' }} icon={<ReloadOutlined />}>重置主题</Button>
                </Tooltip>
            </div>]}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ProForm
                    formRef={form}
                    layout="horizontal"
                    submitter={{ render: false }}
                    onValuesChange={onThemeChange}
                    params={userTheme}
                    request={() => userTheme || { themeType: 'default', colorPrimary: '#1677FF', borderRadius: 6, compact: 'default' }}>
                    <ProFormItem label="主题" name="themeType">
                        <CheckCard.Group size="small" options={themeOptions} style={{ width: '100%' }} />
                    </ProFormItem>
                    <ProFormItem label="主色" name="colorPrimary">
                        <ColorPicker />
                    </ProFormItem>
                    <ProFormItem label="圆角" name="borderRadius">
                        <RadiusPicker />
                    </ProFormItem>
                    <ProFormRadio.Group label="宽松度" name="compact" options={compactOptions}/>
                    <ProFormItem hidden name="colorBgLayout" />
                </ProForm>
            </div>
        </ProCard>
    </PageContainer>
}

export default ThemeSetting;