import { Modal } from "antd"
import { useState } from "react";

type LargeScreenState = {
    open: boolean;
}

/**
 * 大屏-modal弹框全屏
 */
export default (props: any) => {

    const [state, setState] = useState<LargeScreenState>({
        open: false
    });
    const closeModal = () => {
        setState({ ...state, open: false });
    }

    return <>
        <a style={{ lineHeight: '25px' }} onClick={() => setState({ ...state, open: true })}>{props.children}</a>
        <Modal open={state.open} onClose={closeModal} onCancel={closeModal} 
            closable={false}
            style={{ maxWidth: "100vw", top: 0, padding:'0px' }} width="100vw" 
            styles={{ body: { height: "94vh", padding:'0px' } }} footer={false}>
        </Modal>
    </>
}