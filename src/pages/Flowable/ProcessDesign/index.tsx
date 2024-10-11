import { PageContainer } from "@ant-design/pro-components"
import { useLocation } from "@umijs/max"
import { useEffect, useRef, useState } from "react";
import { details } from "../Model/props";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import styles from "./bpmn.module.scss";
import Toolbar from "./components/ToolBar";
import PropertiesPanel from "./components/PropertiesPanel";
import { xmlStr } from "./props";
import { zhTranslate } from "./props/zh-translate";
type Element = import('bpmn-js/lib/model/Types').Element;

export default () => {

    const { state }: any = useLocation();
    const [xml, setXml] = useState<string | null>(null);
    const [dataInfo, setDataInfo] = useState();
    const containerRef = useRef(null);
    const [defaultElement, setDefaultElement] = useState<Element>();
    const [modeler, setModeler] = useState<BpmnModeler>();

    /**
     * 监听xml变化
     */
    useEffect(() => {
        if (!!xml && containerRef.current) {
            const bm = new BpmnModeler({
                container: containerRef.current,
                height: '76vh',
                additionalModules: [zhTranslate],
                moddleExtensions: {
                },
                keyboard: {
                    bindTo: document
                },
                bpmnRenderer: {
                    defaultLabelColor: "#000",
                    defaultFillColor: '#eef4ff',
                    defaultStrokeColor: '#349afa'
                },
                textRenderer: {
                    defaultStyle: {
                        fontFamily: '"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"',
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                    }
                },
            });
            // 定位到中间
            bm.on("import.done", () => {
                const canvas: any = bm.get('canvas');
                // canvas.zoom('fit-viewport', 'auto');
                const el = canvas.getRootElement();
                setDefaultElement(el);
            });
            // 装载xml
            bm.importXML(xml).then(() => {
                console.log("import xml success!")
            }).catch((err) => console.log("import xml error: ", err))
                
            setModeler(bm);
            // 及时销毁画布
            return () => bm && bm.destroy();
        }
    }, [xml]);

    const loadData = () => {
        if (state?.id) {
            details(state.id).then((res) => {
                setDataInfo(res);
                if (res && res.modelEditorXml) {
                    setXml(res.modelEditorXml);
                } else {
                    setXml(xmlStr(res.key, res.name));
                }
            });
        } else {
            setXml(xmlStr('custom', '流程设计器'));
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return <PageContainer pageHeaderRender={false}>
        {(modeler && dataInfo) && <div className={styles.toolbar}><Toolbar modeler={modeler} dataInfo={dataInfo} load={loadData}/></div>}
        <div id="container" className={styles.container} ref={containerRef} style={{ width: "100%", height: "100%" }} />
        { (modeler && defaultElement) && <PropertiesPanel modeler={modeler} defaultElement={defaultElement}/> }
    </PageContainer>

}