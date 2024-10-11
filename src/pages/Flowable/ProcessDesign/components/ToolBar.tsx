import { Button } from '@/components';
import { App, Modal, Space, Tooltip } from "antd";
import BpmnModeler from "bpmn-js/lib/Modeler";
import { useSaveHotKeyFunction } from './Hooks';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { KeyOutlined, RedoOutlined, ReloadOutlined, SaveOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { save } from "../../Model/props/service";
import { IconFont } from '@/utils/format';

/**
 * 流程设计器工具栏
 * @param {
 *      modeler: 流程实例
 *      dataInfo: 用户信息
 *      load: 刷新信息
 * } 
 * @returns 
 */
const Toolbar: React.FC<{ modeler: BpmnModeler, dataInfo: any; load: Function }> = ({ modeler, dataInfo, load }) => {
    
    const { message } = App.useApp();
    const currentZoomValueRef = useRef<number>(1);
    const selectItemsRef: MutableRefObject<Array<any> | undefined> = useRef();
    const [shortcutKeysOpen, setShortcutKeysOpen] = useState(false);

    useEffect(() => {
        if (modeler) {
            const eventBus: any = modeler.get('eventBus');
            const listener = (e: { newSelection: Array<any> }) => {
                selectItemsRef.current = e.newSelection
            }
            eventBus.on('selection.changed', listener)
            return () => {
                eventBus.off('selection.changed', listener);
            }
        }
    }, [])

    /**
     * 放大
     */
    function zoomIn() {
        currentZoomValueRef.current += 0.05;
        (modeler.get("canvas") as any).zoom(currentZoomValueRef.current, "auto")
    }

    /**
     * 缩小
     */
    function zoomOut() {
        currentZoomValueRef.current -= 0.05;
        (modeler.get("canvas") as any).zoom(currentZoomValueRef.current, "auto")
    }

    /**
     * 撤销
     */
    function undo() {
        (modeler.get("commandStack") as any).undo()
    }

    /**
     * 重做
     */
    function redo() {
        (modeler.get("commandStack") as any).redo()
    }

    /**
     * 保存事件
     */
    const xmlSave = async (dataInfo: any) => {
        const xmlResult = await modeler.saveXML({ format: true });
        // 更新流程信息
        await save({ id: dataInfo.id, key: dataInfo.key, modelEditorXml: xmlResult.xml });
        message.success('流程信息已更新！');
        load();
    }

    /**
     * 下载当前流程设计图片
     */
    const downloadSvg = async () => {
        // svg字符串
        const svgResult = await modeler.saveSVG();
        // 创建画布
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.fillStyle = '#fff';
            context.fillRect(0, 0, 10000, 10000);
            const image = new Image();
            image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgResult.svg)}`;
            image.onload = () => {
                canvas.width = image.width + 100;
                canvas.height = image.height + 200;
                const x = (canvas.width - image.width) / 2;
                const y = (canvas.height - image.height) / 2;
                // 将图片渲染到画布
                context.drawImage(image, x, y);
                const a = document.createElement('a');
                a.download = `superb-flowable${new Date().getSeconds()}.png`;
                // 画布转图片
                a.href = canvas.toDataURL('image/png');
                a.click();
            }
        }
    }
    
    /**
     * 按键监听
     */
    useSaveHotKeyFunction(() => xmlSave(dataInfo));
    return (
        <>
            <Modal title="快捷键" open={shortcutKeysOpen}
                width={"40%"}
                footer={<Button type={"primary"} key="back" onClick={() => setShortcutKeysOpen(false)}>好的</Button>}
                onCancel={() => setShortcutKeysOpen(false)}>
                <ul>
                    <li>撤销：⌘ (Ctrl) + Z</li>
                    <li>重做：⌘ (Ctrl) + ⇧ (Shift) + Z</li>
                    <li>全选：⌘ (Ctrl) + A</li>
                    <li>删除：Delete (删除键)</li>
                    <li>编辑文字：E</li>
                    <li>抓手工具：H</li>
                    <li>套索工具：L</li>
                    <li>空间工具：S</li>
                </ul>
            </Modal>

            <Space>
                <Space.Compact block>
                    <Tooltip title="放大">
                        <Button onClick={zoomIn} icon={<ZoomInOutlined />} />
                    </Tooltip>
                    <Tooltip title="缩小">
                        <Button onClick={zoomOut} icon={<ZoomOutOutlined />} />
                    </Tooltip>
                </Space.Compact>
                <Space.Compact block>
                    <Tooltip title="重做">
                        <Button onClick={redo} icon={<ReloadOutlined />} />
                    </Tooltip>
                    <Tooltip title="撤销">
                        <Button onClick={undo} icon={<RedoOutlined />} />
                    </Tooltip>
                </Space.Compact>
                <Space.Compact block>
                    <Tooltip title="快捷键">
                        <Button onClick={() => setShortcutKeysOpen(true)} icon={<KeyOutlined />} />
                    </Tooltip>
                </Space.Compact>
                { dataInfo?.id && <Tooltip title="保存更新">
                    <Button icon={<SaveOutlined/>} onClick={() => xmlSave(dataInfo)}/>
                </Tooltip> }
                <Button icon={<IconFont type='icon-xiazai2'/>} onClick={() => downloadSvg()}/>
                
                <Button type="link" info size="large">{dataInfo?.id ? `流程标识：${dataInfo?.key}-流程名称：${dataInfo?.name}` : '普通流程设计器'}</Button>
            </Space>
        </>
    );

}

export default Toolbar
