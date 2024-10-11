import { PageContainer } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Result } from "antd";
import React from "react";

/**
 * 404
 */
const NoFoundPage: React.FC = () => {

    return <PageContainer>
        <Result
        status='404'
        title='404'
        subTitle="对不起，您访问的页面不存在!"
        extra={
            <Button type="primary" onClick={() => { history.push('/home') }}>
                去首页
            </Button>
        } />
    </PageContainer>
}

export default NoFoundPage;