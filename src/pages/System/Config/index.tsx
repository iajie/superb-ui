import { Button, ProFormUpload } from "@/components"
import { PageContainer, ProForm, ProFormSwitch, ProFormTextArea } from "@ant-design/pro-components"
import { useModel } from "@umijs/max"
import { Flex, Row } from "antd";

export default () => {

    const { initialState } = useModel('@@initialState');
    // 租户页脚
    const { footer } = initialState?.tenant;

    return <PageContainer title="租户系统配置">
        <ProForm grid colProps={{ span: 12 }} submitter={{ 
            render: (props, dom) => <Flex justify='center' align="center" gap="large">{dom}</Flex> 
        }}>
            <ProFormTextArea fieldProps={{ rows: 4 }} label="页脚设置" name="footer" tooltip="设置文字和html字符串均可"/>
            <ProFormUpload label="登录背景" style={{ padding: '0 50px' }} tooltip="支持视频和图片" name="loginBg" itemProps={{ maxCount: 1 }} />
            <ProFormSwitch label="水印开关" name="waterMark"/>
        </ProForm>
    </PageContainer>
}