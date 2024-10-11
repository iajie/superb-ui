import { history } from "@umijs/max";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMatchRoute } from "./useMatchRoute";

/***********接口类型定义-开始***********/
export interface KeepAliveTab {
    //标签名称
    title: string;
    //路由地址
    routePath: string;
    //Tab标签KEY
    key: string; // 这个key，后面刷新有用到它
    //组件地址
    pathname: string;
    //图标
    icon?: any;
    //标签内容
    children: any;
    //是否外部链接
    isIframe?: boolean;
}

/**
 * 生成Tab标签KEY值
 * @returns 时间戳
 */
function getKey() {
    return new Date().getTime().toString();
}

const useKeepAliveTabs = () => {
    //标签集合
    const [keepAliveTabs, setKeepAliveTabs] = useState<KeepAliveTab[]>([
        {
            children: 'sadsadsadsa',
            key: '1687938225493',
            pathname: '/',
            routePath: '/',
            title: '首页',
        },
    ]);
    //已选择路由地址
    const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>('');
    //显示标签事件
    const keepAliveShowEvents = useRef<Record<string, Array<() => void>>>({});
    //隐藏标签事件
    const keepAliveHiddenEvents = useRef<Record<string, Array<() => void>>>({});
    //浏览器地址监听
    const matchRoute = useMatchRoute();
    //显示标签
    const onShow = useCallback((cb: () => void) => {
        if (!keepAliveShowEvents.current[activeTabRoutePath]) {
            keepAliveShowEvents.current[activeTabRoutePath] = [];
        }
        keepAliveShowEvents.current[activeTabRoutePath].push(cb);
    }, [activeTabRoutePath]);

    //显示隐藏
    const onHidden = useCallback((cb: () => void) => {
        if (!keepAliveHiddenEvents.current[activeTabRoutePath]) {
            keepAliveHiddenEvents.current[activeTabRoutePath] = [];
        }
        keepAliveHiddenEvents.current[activeTabRoutePath].push(cb);
    }, [activeTabRoutePath]);

    // 关闭tab
    const closeTab = useCallback((routePath: string = activeTabRoutePath) => {
        const index = keepAliveTabs.findIndex((o) => o.routePath === routePath);
        if (keepAliveTabs[index].routePath === activeTabRoutePath) {
            if (index > 0) {
                history.push(keepAliveTabs[index - 1].routePath);
            } else {
                history.push(keepAliveTabs[index + 1] ? keepAliveTabs[index + 1].routePath : '/home');
            }
        }
        keepAliveTabs.splice(index, 1);
        delete keepAliveHiddenEvents.current[routePath];
        delete keepAliveShowEvents.current[routePath];
        setKeepAliveTabs([...keepAliveTabs]);
    }, [activeTabRoutePath]);

    // 关闭其他
    const closeOtherTab = useCallback((routePath: string = activeTabRoutePath) => {
        const toCloseTabs = keepAliveTabs.filter((o) => o.routePath !== routePath);
        // 清除被关闭的tab注册的onShow事件和onHidden事件
        toCloseTabs.forEach((tab) => {
            delete keepAliveHiddenEvents.current[tab.routePath];
            delete keepAliveShowEvents.current[tab.routePath];
        });
        setKeepAliveTabs((prev) => prev.filter((o) => (o.routePath === routePath || o.routePath === '/')));
    }, [activeTabRoutePath]);

    // 刷新tab
    const refreshTab = useCallback((routePath: string = activeTabRoutePath) => {
        setKeepAliveTabs((prev) => {
            const index = prev.findIndex((tab) => tab.routePath === routePath);
            if (index >= 0) {
                // 这个react的特性，key变了，组件会卸载重新渲染
                prev[index].key = getKey();
            }
            delete keepAliveHiddenEvents.current[prev[index].routePath];
            delete keepAliveShowEvents.current[prev[index].routePath];
            return [...prev];
        });
    }, [activeTabRoutePath]);

    useEffect(() => {
        if (!matchRoute) return;
        
        //查找是否又相同的tab
        const existKeepAliveTab = keepAliveTabs.find((o) => o.routePath === matchRoute?.routePath);
        setActiveTabRoutePath(matchRoute.routePath);
        // 如果不存在则需要插入
        if (!existKeepAliveTab) {
            setKeepAliveTabs((prev) => [
                ...prev,
                {
                    title: matchRoute.title,
                    key: getKey(),
                    routePath: matchRoute.routePath,
                    pathname: matchRoute.pathname,
                    children: matchRoute.children,
                    icon: matchRoute.icon,
                    isIframe: matchRoute.isIframe,
                    url: matchRoute.url,
                },
            ]);
        } else {
            //如果不需要【缓存】，修改tab的key值，会自动刷新
            let newKeepAliveTabs = [...keepAliveTabs].map((tab: any) => {
                if (tab.routePath === matchRoute.routePath) {
                    return { ...tab, children: matchRoute.children };
                }
                return { ...tab };
            });
            const index = newKeepAliveTabs.findIndex((tab) => tab.routePath === matchRoute.routePath);
            newKeepAliveTabs[index].key = getKey();
            setKeepAliveTabs(newKeepAliveTabs);
        }
        // 路由改变，执行上一个tab的onHidden事件
        (keepAliveHiddenEvents.current[activeTabRoutePath] || []).forEach((cb) => cb());
    }, [matchRoute]);


    return {
        keepAliveTabs,
        activeTabRoutePath,
        closeTab,
        refreshTab,
        closeOtherTab,
        onShow,
        onHidden,
    }
}

export default useKeepAliveTabs;