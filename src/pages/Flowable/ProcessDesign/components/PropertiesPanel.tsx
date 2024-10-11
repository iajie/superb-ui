import { Drawer, Alert, Popover, ColorPicker, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import BpmnModeler from "bpmn-js/lib/BaseModeler";
import { Button, ProFormOrganTreeSelect } from "@/components";
import { ProForm, ProFormItem, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { BusinessObjectType, userOption } from "../props";
import { QuestionCircleOutlined } from "@ant-design/icons";
type EventBus = import('diagram-js/lib/core/EventBus').default;
type Modeling = import('bpmn-js/lib/features/modeling/Modeling').default;
type BpmnFactory = import('bpmn-js/lib/features/modeling/BpmnFactory').default;

type Element = import('bpmn-js/lib/model/Types').Element & {
    businessObject: BusinessObjectType
};

/**
 * 自定义属性面板
 * @param param0 
 * @returns 
 */
const PropertiesPanel: React.FC<{
    modeler: BpmnModeler,
    defaultElement: Element,
    attrPrefix?: string
}> = ({ modeler, defaultElement, attrPrefix = "flowable:" }) => {

    const modeling: Modeling = modeler.get('modeling');
    const [currentElement, setCurrentElement] = useState<Element>(defaultElement);
    
    // 抽屉
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>();
    const [showUserProperties, setShowUserProperties] = useState<boolean>(false);
    const [showMultiInstancesProperties, setShowMultiInstancesProperties] = useState<boolean>(false);
    const [showConditionExpression, setShowConditionExpression] = useState<boolean>(false);
    const businessObjectRef = useRef<Element["businessObject"]>()
    const ignoreElementChanged = useRef(false);

    /**
     * 得到当前节点元素
     * @param element 
     */
    const changeCurrentElement = (element: Element) => {
        // 设置当前选择元素
        setCurrentElement(element);
        // 获取元素节点信息
        const businessObject = element.businessObject;
        // 赋值当前节点
        businessObjectRef.current = businessObject;
        //是否显示用户相关的属性
        if (businessObject?.$type.endsWith("UserTask")) {
            if (businessObject.$attrs?.candidateUsers && typeof businessObject.$attrs?.candidateUsers == 'string') {
                businessObject.$attrs.candidateUsers = businessObject.$attrs.candidateUsers.split(',');
            }
            setShowUserProperties(true);
        } else {
            setShowUserProperties(false);
        }

        //多实例，注意：StandardLoopCharacteristics 是循环实例
        if (businessObject.loopCharacteristics && businessObject.loopCharacteristics.$type != "bpmn:StandardLoopCharacteristics") {
            if (businessObject.loopCharacteristics?.completionCondition && businessObject.loopCharacteristics?.completionCondition.$type.endsWith("Expression")) {
                businessObject.$attrs.completionCondition = businessObject.loopCharacteristics.completionCondition.body;
            }
            setShowMultiInstancesProperties(true);
        } else {
            setShowMultiInstancesProperties(false);
        }

        //条件表达式
        if (businessObject.$type.endsWith("SequenceFlow")) {
            if (businessObject?.conditionExpression && businessObject.conditionExpression.$type.endsWith("FormalExpression")) {
                businessObject.$attrs.conditionExpression = businessObject.conditionExpression.body;
            }
            setShowConditionExpression(true);
        } else {
            setShowConditionExpression(false);
        }
        const formData = { ...businessObject, ...businessObject.$attrs };
        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key)) {
                if (key.startsWith(attrPrefix)) {
                    formData[key.substring(attrPrefix.length)] = formData[key];
                }
            }
        }
        // 给元素节点赋值
        setFormData(formData);
        // 弹出框--备注不需要属性设置
        if (businessObject.$type !== 'bpmn:Process' && businessObject.$type !== 'bpmn:Association' && businessObject.$type !== 'bpmn:TextAnnotation') {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }

    /**
     * 画布实例监听器
     */
    useEffect(() => {
        const eventBus: EventBus = modeler.get('eventBus');
        // 点击画布监听
        const clickListener = (e: { element: Element }) => {
            changeCurrentElement(e.element);
        }
        // 加载后绑定监听
        eventBus.on('element.click', clickListener)
        // 节点监听
        const changedListener = (e: { element: Element }) => {
            if (!ignoreElementChanged.current) {
                //忽略顺序流的修改
                if (e.element.businessObject?.$type.endsWith("SequenceFlow")) {
                    return;
                }
                changeCurrentElement(e.element);
            }
        }
        eventBus.on('element.changed', changedListener);
        return () => {
            eventBus.off('element.click', clickListener);
            eventBus.off('element.changed', changedListener);
        }
    }, [modeler])


    /**
     * 元素属性赋值
     * @param property 属性名称
     * @param value 属性值
     * @param forBusinessObjectAttrs 是否为$attrs属性
     */
    const updateElementProperty = (property: string, value: any, forBusinessObjectAttrs: boolean = false) => {
        if (businessObjectRef.current && currentElement) {
            try {
                ignoreElementChanged.current = true;
                if (forBusinessObjectAttrs) {
                    currentElement.businessObject.$attrs[attrPrefix + property] = value;
                } else {
                    modeling.updateProperties(currentElement, { [property]: value });
                }
            } finally {
                ignoreElementChanged.current = false;
            }
        }
    }

    /**
     * 表单变化
     * @param changeValue 触发变化的属性
     * @param values 表单值
     */
    const onFormChange = (changeValue: Partial<BusinessObjectType>, values: BusinessObjectType) => {
        for (const key in changeValue) {
            if (Object.prototype.hasOwnProperty.call(changeValue, key)) {
                if (key == 'conditionExpression') {
                    // 条件表达式
                    const bpmnFactory: BpmnFactory = modeler.get("bpmnFactory");
                    const expression = bpmnFactory.create("bpmn:FormalExpression")
                    expression.body = changeValue.conditionExpression;
                    updateElementProperty("conditionExpression", changeValue?.conditionExpression, true);
                } else if (key == 'completionCondition') {
                     // 会签条件表达式
                    const bpmnFactory: BpmnFactory = modeler.get("bpmnFactory");
                    const expression = bpmnFactory.create("bpmn:Expression");
                    expression.body = changeValue.completionCondition;
                    const loopCharacteristics = currentElement.businessObject.loopCharacteristics;
                    if (loopCharacteristics) {
                        expression.$parent = loopCharacteristics;
                        loopCharacteristics.completionCondition = expression;
                    }
                    updateElementProperty("loopCharacteristics", changeValue.completionCondition, true);
                } else if (key == 'color') {
                    if (changeValue?.color) {
                        modeling.setColor([currentElement], { stroke: changeValue?.color.toHexString()});
                        updateElementProperty('color', changeValue?.color.toHexString(), true);
                    }
                } else if (key == 'assignee' || key == 'candidateUsers' || key == 'candidateGroups') {
                    // @ts-ignore
                    updateElementProperty(key, changeValue[key], true);
                } else {
                    // @ts-ignore
                    updateElementProperty(key, changeValue[key], false);
                }
            }
        }
    }

    return <Drawer open={open} mask={false} destroyOnClose title={<Alert message={`当前对象: ${currentElement?.businessObject?.$type}`} type="info" />} maskClosable={false} onClose={() => setOpen(false)}>
        <ProForm params={formData} onValuesChange={onFormChange} submitter={{ render: false }} request={async () => formData || {}}>
            <ProFormText label="节点标识" name="id" rules={[{ required: true, message: '流程节点id不能为空' }]} />
            <ProFormText label="节点名称" name="name" />
            <ProFormItem label="节点颜色" name="color"><ColorPicker /></ProFormItem>
            {showConditionExpression && <ProFormTextArea label={<Popover content={<Button type="link" target="_" href="https://blog.csdn.net/WTUDAN/article/details/125407651">条件表达式参数考</Button>}>条件</Popover>} name='conditionExpression' />}
            {(showUserProperties && !showMultiInstancesProperties) && <>
                <ProFormSelect label={<Popover content="流程发起人为默认流程变量: ${initiator}可以得到" title="流程发起人">指定人员</Popover>} name='assignee' request={userOption} rules={[{ required: true, message: '流程节点执行人员不能为空' }]} />
                <ProFormSelect label="候选人员" name='candidateUsers' mode="multiple" request={userOption} />
                <ProFormOrganTreeSelect label="候选部门" name='candidateGroups' />
            </>}
            {showMultiInstancesProperties && <>
                <Popover content={`${currentElement.businessObject.loopCharacteristics?.isSequential ? '按顺序依次审批，' : '不分顺序，一起审批，'}需要全部审批完成，才会进入下个节点`} title={`${currentElement.businessObject.loopCharacteristics?.isSequential ? "串行" : "并行"}审批`}>
                    <Alert message={`多人审批: ${currentElement.businessObject.loopCharacteristics?.isSequential ? "串行" : "并行"}`} type="info" />
                </Popover>
                <ProFormSelect label="执行人员" name='candidateUsers' mode="multiple" request={userOption} />
                <ProFormTextArea label={<Popover content={<Space direction="vertical">
                    <span>会签默认流程变量：</span>
                    <span>1.nrOfInstances(numberOfInstances): 会签中总共的实例数</span>
                    <span>2.nrOfActiveInstances: 已经完成的实例数量;对于串行多实例来说，这个值始终是 1。</span>
                    <span>3.nrOfCompletedInstances: 当前还没有完成的实例数量</span>
                    <span>完成表达式使用示例：</span>
                    <span>4.{`$` + `{nrOfInstances == nrOfCompletedInstances} 表示所有人员审批完成后会签结束。`}</span>
                    <span>5.{`$` + `{nrOfCompletedInstances == 1}表示一个人完成审批，该会签就结束。`}</span>
                    <span style={{ color: 'orangered' }}>注：设置一个人完成后会签结束，那么其他人的代办任务都会消失。</span>
                </Space>}>
                    完成条件 <QuestionCircleOutlined />
                </Popover>} name='completionCondition' />
            </>}
        </ProForm>
    </Drawer>;
}

export default PropertiesPanel
