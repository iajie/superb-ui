import { Button, DataScopeSelect } from "@/components";
import { clearCache, getMenu, loginOut } from "@/services/user.service";
import { IconFont, sideMenu } from "@/utils/format";
import { ClearOutlined, LogoutOutlined, SettingOutlined, ToolOutlined } from "@ant-design/icons";
import { PageContainer, ProLayout, WaterMark } from "@ant-design/pro-components";
import { Link, useModel, history, useSelector } from "@umijs/max";
import { App, ConfigProvider, Dropdown, Menu, message, Modal, Space, Tooltip, Typography, theme, Tabs, MenuProps } from "antd";
import { useCallback, useMemo } from "react";
import { KeepAliveTabContext } from "./components/context";
import useKeepAliveTabs, { KeepAliveTab } from "./components/useKeepAliveTabs";
import { AliveScope } from "react-activation";
import type { ItemType, MenuInfo } from "rc-menu/lib/interface";
import IFrame from "@/pages/iFrame";
import LargeScreen from "./largeScreen";

enum OperationType {
    //刷新
    REFRESH = "refresh",
    //关闭
    CLOSE = "close",
    //关闭其他
    CLOSEOTHER = "close-other",
}
type MenuItemType = (ItemType & { key: OperationType }) | null;

export default () => {
    const { initialState } = useModel("@@initialState");
    // 全局状态数据，可监听initialState
    const { userTheme } = useSelector((state: any) => state);
    const { tenant, user, topMenu, leftMenu }: any = initialState;
    //用于修改 Seed Token 到 Map Token 的算法
    const algorithmFn = useMemo(() => {
        const isLight = userTheme.themeType !== "dark";
        const algorithms = [isLight ? theme.defaultAlgorithm : theme.darkAlgorithm];
        if (userTheme.compact === "compact") {
            algorithms.push(theme.compactAlgorithm);
        }
        return algorithms;
    }, [userTheme]);

    const {
        //标签集合
        keepAliveTabs,
        //当前标签路径
        activeTabRoutePath,
        //关闭标签
        closeTab,
        //刷新标签
        refreshTab,
        //关闭其他标签
        closeOtherTab,
        //隐藏标签
        onHidden,
        //显示标签
        onShow,
    } = useKeepAliveTabs();

    /**
     * 将关闭、关闭其他、刷新、显示、隐藏标签，存储进Context,提供子组件使用
     */
    const keepAliveContextValue = useMemo(
        () => ({ keepAliveTabs, closeTab, closeOtherTab, refreshTab, onHidden, onShow }),
        [keepAliveTabs, closeTab, closeOtherTab, refreshTab, onHidden, onShow],
    );

    //标签右键菜单
    const menuItems: MenuItemType[] = useMemo(() => [
        { label: "刷新", key: OperationType.REFRESH },
        keepAliveTabs.length <= 1 ? null : { label: "关闭", key: OperationType.CLOSE, },
        keepAliveTabs.length <= 1 ? null : { label: "关闭其他", key: OperationType.CLOSEOTHER },
    ], [keepAliveTabs]);
    
    //渲染右键菜单
    const renderTabTitle = useCallback((tab: KeepAliveTab) => <Dropdown
        menu={{ items: menuItems, onClick: (e) => menuClick(e, tab) }}
        trigger={["contextMenu"]}>
        <div
            style={{
                margin: "-12px 0",
                padding: "12px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }}>
            {tab.title}
        </div>
    </Dropdown>, [menuItems]);

    /**
     * 获取标签子元素
     */
    const getTabChildren = (tab: any) => {
        if (tab.isIframe) {
            return <div key={tab.key} style={{ height: "calc(100vh - 182px)", overflow: "hidden" }}>
                <PageContainer>
                    <IFrame url={tab.url} />
                </PageContainer>
            </div>;
        }
        return <div key={tab.key} style={{ height: "calc(100vh - 142px)", overflow: "auto" }}>
            {tab.children}
        </div>;
    };

    //标签数据
    const tabItems = useMemo(() => {
        const tabs = keepAliveTabs.map((tab, index) => {
            return {
                key: tab.routePath || tab.key,
                label: renderTabTitle(tab),
                children: getTabChildren(tab),
                closable: index > 0,
            };
        });
        
        return tabs;
    }, [keepAliveTabs]);

    const menuClick = useCallback(({ key, domEvent }: MenuInfo, tab: KeepAliveTab) => {
        domEvent.stopPropagation();
        if (key === OperationType.REFRESH) {
            refreshTab(tab.routePath);
        } else if (key === OperationType.CLOSE) {
            closeTab(tab.routePath);
        } else if (key === OperationType.CLOSEOTHER) {
            closeOtherTab(tab.routePath);
        }
    }, [closeOtherTab, closeTab, refreshTab]);


    /**
     * 标签却换事件
     */
    const onTabsChange = useCallback((tabRoutePath: string) => {
        const curTab = keepAliveTabs.find((o) => o.routePath === tabRoutePath);
        if (curTab) {
            history.push(curTab?.pathname || curTab?.routePath);
        }
    }, [keepAliveTabs]);

    /**
     * 新增和删除页签的回调
     * @param targetKey 当前标签KEY
     * @param action 操作类型
     */
    const onTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: "add" | "remove") => {
        if (action === "remove") {
            closeTab(targetKey as string);
        }
    };

    return <ConfigProvider theme={{
        hashed: false,
        algorithm: algorithmFn,
        token: { ...userTheme }
    }}>
        <App>
            <ProLayout fixSiderbar fixedHeader
                menu={{
                    locale: false,
                    request: async (params, defaultMenuDat) => {
                        if (!defaultMenuDat.length) {
                            defaultMenuDat.push({ name: '首页', path: '/', component: './Home' });
                        }
                        const defaultMenu = defaultMenuDat.filter(item => !item.custom);
                        const menu = sideMenu(leftMenu);
                        return defaultMenu.concat(menu);
                    }
                }}
                menuItemRender={(item, defaultDom, menuProps) => {
                    // 解决菜单图标丢失问题
                    return <Link style={{ display: 'flex' }} to={item.path || ''} onClick={() => {
                        if (item.path) {
                            // activeTabRoutePath = item.path;
                            localStorage.setItem('activePath', item.path);
                        }
                    }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
                            {item.icon || <IconFont type="icon-baobiao" />}
                            <span>{defaultDom}</span>
                        </div>
                    </Link>
                }}
                headerTitleRender={(logo, title: any) => {
                    return <>
                        <a href="/">
                            {logo}
                            <Typography.Text
                                ellipsis={{ tooltip: title?.props?.children }}
                                style={{ width: 190, fontSize: '20px', fontWeight: 'bold', marginLeft: '5px' }}>
                                {title?.props?.children}
                            </Typography.Text>
                        </a>
                        <Space size={40} style={{ position: 'absolute', left: '238px' }}>
                            {topMenu && topMenu.length ? <Menu
                                style={{ minWidth: 0, flex: "auto", width: '60vw' }}
                                items={topMenu}
                                selectedKeys={[activeTabRoutePath]}
                                onClick={({ key, keyPath, item }: any) => {
                                    // 存储活跃路由
                                    history.push(key);
                                }}
                                mode="horizontal" /> : null}
                        </Space>
                    </>
                }}
                location={{
                    pathname: activeTabRoutePath
                }}
                layout="mix"
                route={global.routes}
                contentStyle={{ height: '91vh' }}
                suppressSiderWhenMenuEmpty
                footerRender={(props) => <div dangerouslySetInnerHTML={{ __html: tenant.footer }} style={{
                    lineHeight: "40px",
                    borderBlockStart: "1px solid rgba(5, 5, 5, 0.06)",
                    position: "fixed",
                    bottom: "0px",
                    width: "100%",
                    textAlign: "center",
                    background: "none",
                }} />}
                avatarProps={{
                    src: global.viewUrl(user?.avatar) || 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
                    size: 'large',
                    title: user?.nickname || 'Superb',
                    render: (props, dom) => <Dropdown menu={{
                        items: [
                            {
                                key: 'userSettings',
                                label: <Button type="link" style={{ color: 'black' }} icon={<SettingOutlined />} onClick={() => history.push('/user/settings')}>个人设置</Button>
                            },
                            {
                                key: 'themeSettings',
                                label: <Button type="link" style={{ color: 'black' }} icon={<ToolOutlined />} onClick={() => history.push('/theme')}>主题设置</Button>
                            },
                            {
                                key: 'clearCache',
                                label: <Button type="link" icon={<ClearOutlined />} onClick={async () => {
                                    const res = await clearCache();
                                    if (res && res.success) {
                                        message.success('缓存清理成功！');
                                    }
                                }}>清除缓存</Button>
                            },
                            { type: 'divider' },
                            {
                                key: 'logout',
                                label: <Button type="link" danger style={{ color: 'black' }} icon={<LogoutOutlined />} onClick={() => {
                                    const modal = Modal.confirm({
                                        title: '提示',
                                        content: '是否退出登录！',
                                        onCancel: () => modal.destroy(),
                                        onOk: async () => {
                                            const res = await loginOut();
                                            if (res && res.success) {
                                                modal.destroy();
                                                localStorage.clear();
                                                history.push('/login');
                                            }
                                        }
                                    });
                                }}>退出登录</Button>
                            },
                        ]
                    }}>{dom}</Dropdown>
                }}
                actionsRender={(props) => {
                    // 如果为手机端不展示操作栏
                    if (props.isMobile) return [];
                    if (typeof window === 'undefined') return [];
                    // 增加操作列表
                    return [
                        <Tooltip title="系统通知"><IconFont type="icon-xiaoxi3" onClick={() => history.push('/user/notice')} /></Tooltip>,
                        <LargeScreen><Tooltip title="数据大屏-驾驶舱"><IconFont type="icon-tongji" /></Tooltip></LargeScreen>,
                        user && <DataScopeSelect />
                    ];
                }}
                pageTitleRender={false}
                logo={global.viewUrl(tenant.logo) || 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg'}
                title={tenant.name || 'Superb'}>
                <WaterMark fontColor="rgb(217 217 217 / 58%)" gapX={180} gapY={150}
                    content={`${tenant.tenantKey}-${(user?.nickname || user?.username) || 'Superb'}${user?.phoneNumber && '-' + user.phoneNumber.substr(7, 4)}`}>
                    <KeepAliveTabContext.Provider value={keepAliveContextValue}>
                        <AliveScope>
                            <Tabs
                                type="editable-card"
                                items={tabItems}
                                activeKey={activeTabRoutePath}
                                onChange={onTabsChange}
                                className="keep-alive-tabs"
                                hideAdd
                                destroyInactiveTabPane={true}
                                animated={false}
                                onEdit={onTabEdit}
                            />
                        </AliveScope>
                    </KeepAliveTabContext.Provider>
                </WaterMark>
            </ProLayout>
        </App>
    </ConfigProvider >
}