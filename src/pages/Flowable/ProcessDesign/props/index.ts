import { userOptions } from "@/services/user.service"
import { Color } from "antd/es/color-picker";
/**
 * 用户列表
 * @param organId 
 * @returns 
 */
export const userOption = async ({ organId }: { organId?: string }) => {
    const { success, result } = await userOptions(organId);
    const value = [{ value: '${initiator}', label: '流程发起人' }];
    return success ? value.concat(result) : value;
}


/**
 * bpmn默认字符串
 * 在flowable定义时存入库中，flowable会解析xml的id和name
 * @param flowKey 流程标识
 * @param flowName 流程名称 
 * @returns 
 */
export const xmlStr = (flowKey?: string, flowName?: string) =>
    `<?xml version="1.0" encoding="UTF-8"?>
<definitions id="definitions" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
    xmlns:flowable="http://flowable.org/bpmn"
    typeLanguage="http://www.w3.org/2001/XMLSchema"
    expressionLanguage="http://www.w3.org/1999/XPath"
    targetNamespace="http://www.flowable.org/processdef">
<process id="${flowKey}" name="${flowName}" isExecutable="true">
    <startEvent id="StartEvent_1y45yut" name="开始">
    <outgoing>SequenceFlow_0h21x7r</outgoing>
    </startEvent>
    <task id="Task_1hcentk">
    <incoming>SequenceFlow_0h21x7r</incoming>
    </task>
    <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
</process>
<bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="${flowKey}">
    <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
        <omgdc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
        <omgdc:Bounds x="160" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="Task_1hcentk_di" bpmnElement="Task_1hcentk">
        <omgdc:Bounds x="240" y="80" width="100" height="80" />
    </bpmndi:BPMNShape>
    <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
        <omgdi:waypoint x="188" y="120" />
        <omgdi:waypoint x="240" y="120" />
    </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`


export type BusinessObjectType = {
    id: string,
    name: string,
    color?: Color,
    /** 条件表达式 */
    conditionExpression?: {
        body: string,
    } | string,
    /** 多实例完成表达式 */
    completionCondition?: string;
    //多实例变量
    loopCharacteristics?: {
        isSequential: boolean, // true:串行, false:并行
        loopCardinality: any,
        collection: any,
        elementVariable: any,
        completionCondition: {
            body: string,
        } | string,
    },
    $type: string,
    $attrs: any,
    /** 操作人 */
    assignee?: string;
    /** 候选人 */
    candidateUsers?: string[];
    /** 候选组 */
    candidateGroups?: string;
}