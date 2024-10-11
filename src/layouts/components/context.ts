import { createContext } from 'react';
/*************类型定义-开始************/
//Tab标签页类型
interface KeepAliveTabContextType {
    //刷新标签
    refreshTab: (path?: string) => void;
    //关闭标签
    closeTab: (path?: string) => void;
    //关闭其他标签
    closeOtherTab: (path?: string) => void;
    //显示标签
    onShow: (cb: () => void) => void;
    //隐藏标签
    onHidden: (cb: () => void) => void;
}

const defaultValue = {
    refreshTab: () => { },
    closeTab: () => { },
    closeOtherTab: () => { },
    onShow: () => { },
    onHidden: () => { },
};
/*************类型定义-结束************/
export const KeepAliveTabContext = createContext<KeepAliveTabContextType>(defaultValue);