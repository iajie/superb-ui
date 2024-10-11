import { StepsForm } from "@ant-design/pro-components";
import { Modal } from "antd";
import React from "react";
import { TenantConfigProps } from "../props";
import { Button } from "@/components";
import { MenuOutlined, ProjectOutlined, UserSwitchOutlined } from "@ant-design/icons";
import MenuConfig from "./config/Menu";
import RoleConfig from "./config/Role";
import AdminConfig from "./config/Admin";

const TenantConfig: React.FC<TenantConfigProps> = (props) => {

    return <StepsForm 
        submitter={{
            render: ({step, onPre, onSubmit}, dom) => {
                if (step === 0) {
                    return <Button onClick={onSubmit} type="primary" ghost info>角色配置</Button>
                } else if (step === 1) {
                    return [
                        <Button key={`menu_step_${step}`} onClick={onPre} ghost warning>菜单配置</Button>,
                        <Button key={`organ_step_${step}`} onClick={onSubmit} ghost type="primary" info>用户配置</Button>
                    ];
                } else if (step === 2) {
                    return [
                        <Button key={`role_step_${step}`} onClick={onPre} ghost warning>系统角色配置</Button>,
                        <Button key={`close_step_${step}`} onClick={props.closeModal}>关闭</Button>
                    ];
                } 
            },
        }}
        stepsFormRender={(dom, submitter) => <Modal 
            title={props.title || '租户配置'}
            open={props.open}
            destroyOnClose
            maskClosable={false}
            width="80%"
            onCancel={props.closeModal}
            footer={submitter}>
            {dom}
        </Modal>}>
        <StepsForm.StepForm stepProps={{ icon: <MenuOutlined /> }} title="菜单配置">
            <MenuConfig tenantId={props.tenantId} />
        </StepsForm.StepForm>
        <StepsForm.StepForm stepProps={{ icon: <ProjectOutlined /> }} title="系统角色配置">
            <RoleConfig tenantId={props.tenantId}/>
        </StepsForm.StepForm>
        <StepsForm.StepForm stepProps={{ icon: <UserSwitchOutlined /> }} title="管理员配置">
            <AdminConfig tenantId={props.tenantId}/>
        </StepsForm.StepForm>
    </StepsForm>
}

export default TenantConfig;