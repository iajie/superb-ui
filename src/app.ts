// 运行时配置
import { getToken } from "./utils/auth";
import { history, matchRoutes } from "@umijs/max";
import { getCurrentUser, getTennat, topAndSideMenu } from "./services/user.service";
import { topMenu, transitionMenusOfRoutes } from "./utils/format";

interface initDataType {
	/** 当前登录用户信息 */
	user?: { avatar: string; nickname: string; organId: string; remarks: any; [key: string]: any; };
	/** 当前登录用户权限列表 */
	permissions?: string[];
	/** 当前登录用户拥有角色 */
	roles?: string[];
	/** 数据权限列表 */
	dataScopes?: { label: string; value: string; }[];
	/** 租户信息 */
	tenant?: any;
	/** 顶部菜单 */
	topMenu?: any;
	/** 侧边栏菜单 */
	leftMenu?: any;
}
let userInfo: initDataType = {};
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<initDataType> {
	let initData: initDataType = {};
	//获取token,如果token不存在，跳转到登录页面，如果存在，获取当前用户信息
	const isAuth = getToken();
	if (isAuth) {
		try {
			if (userInfo.user) {
				initData = userInfo;
				initData.topMenu = topMenu(userInfo.topMenu);
			} else {
				const { success, code, result } = await getCurrentUser();
				if (success && code === 200) {
					initData = result;
					localStorage.setItem('organId', result.dataScopes[0].organId);
					// 将权限和角色添加到全局
					global.AuthorityList = [ ...result.permissions, ...result.roles ];
					global.headers.organId = localStorage.getItem('organId') || result.dataScopes[0].organId;
					initData.topMenu = topMenu(result.topMenu);
					initData.leftMenu = result.leftMenu;
				}
			}
		} catch (error) {
			history.push('/login');
		}
	} else {
		history.push('/login');
	}
	const { success, code, result } = await getTennat();
	if (success && code === 200) {
		initData.tenant = result;
	}
	return initData;
}

// export const layout: RunTimeLayoutConfig = ({ initialState }) => {
// 	// @ts-ignore 屏蔽异常
// 	const { tenant, user, topMenu } = initialState;
// 	//获取全局状态主题设置
// 	return {
// 		title: tenant.name || 'Superb',
// 		logo: global.viewUrl(tenant.logo) || 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
// 		fixSiderbar: true,
// 		fixedHeader: true,
// 		token: {
// 			header: { colorBgHeader: "transparent" },
// 		},
// 		menu: {
// 			locale: false,
// 			request: async (params, defaultMenuDat) => {
// 				if (!defaultMenuDat.length) {
// 					defaultMenuDat.push({ name: '首页', path: '/home', component: './Home' });
// 				}
// 				const defaultMenu = defaultMenuDat.filter(item => !item.custom);
// 				const { success, result } = await getMenu('side');
// 				if (success) {
// 					const menu = sideMenu(result);
// 					return defaultMenu.concat(menu);
// 				}
// 				return defaultMenu;
// 			}
// 		},
// 		menuItemRender: (item, defaultDom, menuProps) => {
// 			// 解决菜单图标丢失问题
// 			return React.createElement(Link, {
// 				style: { display: 'flex' },
// 				to: item.path || '',
// 				onClick: () => {
// 					if (item.path) {
// 						activeTabRoutePath = item.path;
// 						localStorage.setItem('activePath', item.path);
// 					}
// 				}
// 			}, React.createElement('div', {
// 				style: {
// 					display: "flex",
// 					flexDirection: "row",
// 					alignItems: "center",
// 					gap: "8px",
// 				}
// 			}, item.icon || React.createElement(IconFont, { type: `icon-baobiao` }), React.createElement('span', {}, defaultDom)))
// 		},
// 		location: {
// 			pathname: activeTabRoutePath,//activeTabRoutePath
// 		},
// 		headerTitleRender: (logo, title: any) => {
// 			return React.createElement('a', {},
// 				logo,
// 				React.createElement(Typography.Text, {
// 					style: { width: 200, fontSize: '20px', fontWeight: 'bold', marginLeft: '5px' },
// 					ellipsis: { tooltip: title?.props?.children }
// 				}, title?.props?.children),
// 				React.createElement(Space, { size: 40, style: { position: 'absolute', left: '238px' } },
// 					topMenu.length ? React.createElement(Menu, {
// 						mode: 'horizontal',// 横向
// 						style: { minWidth: 0, flex: "auto", width: '70vw' },
// 						items: topMenu,
// 						selectedKeys: [activeTabRoutePath],
// 						onClick: ({ key, keyPath, item }: any) => {
// 							// 存储活跃路由-这里history不生效，需要强制跳转
// 							localStorage.setItem('activePath', key);
// 							// history.push(key);
// 							location.href = key;
// 						}
// 					}) : null
// 				)
// 			);
// 		},
// 		layout: 'mix',
// 		route: global.routes,
// 		contentStyle: { height: '91vh' },
// 		suppressSiderWhenMenuEmpty: true,
// 		footerRender: (props) => React.createElement('div', {
// 			style: {
// 				lineHeight: "40px",
// 				borderBlockStart: "1px solid rgba(5, 5, 5, 0.06)",
// 				position: "fixed",
// 				bottom: "0px",
// 				width: "100%",
// 				textAlign: "center",
// 				background: "none",
// 			},
// 			dangerouslySetInnerHTML: {
// 				__html: tenant.footer
// 			}
// 		}),
// 		avatarProps: {
// 			src: global.viewUrl(user.avatar) || 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
// 			size: 'large',
// 			title: user.nickname,
// 			render: (props, dom) => React.createElement(Dropdown, {
// 				menu: {
// 					items: [
// 						{
// 							key: 'userSettings',
// 							label: React.createElement(Button, {
// 								type: 'link',
// 								style: { color: 'black' },
// 								icon: React.createElement(SettingOutlined),
// 								onClick: () => history.push('/user/settings')
// 							}, '个人设置'),
// 						},
// 						{
// 							key: 'themeSettings',
// 							label: React.createElement(Button, {
// 								type: 'link',
// 								style: { color: 'black' },
// 								icon: React.createElement(ToolOutlined),
// 								onClick: () => history.push('/theme')
// 							}, '主题设置'),
// 						},
// 						{
// 							key: 'clearCache',
// 							label: React.createElement(Button, {
// 								type: 'link',
// 								icon: React.createElement(ClearOutlined),
// 								onClick: async () => {
// 									const res = await clearCache();
// 									if (res && res.success) {
// 										message.success('缓存清理成功！');
// 									}
// 								}
// 							}, '清除缓存'),
// 						},
// 						{ type: 'divider' },
// 						{
// 							key: 'logout',
// 							label: React.createElement(Button, {
// 								type: 'link',
// 								danger: true,
// 								icon: React.createElement(LogoutOutlined),
// 								onClick: () => {
// 									const modal = Modal.confirm({
// 										title: '提示',
// 										content: '是否退出登录！',
// 										onCancel: () => modal.destroy(),
// 										onOk: async () => {
// 											const res = await loginOut();
// 											if (res && res.success) {
// 												modal.destroy();
// 												localStorage.clear();
// 												history.push('/login');
// 											}
// 										}
// 									});
// 								}
// 							}, '退出登录'),
// 						},
// 					]
// 				}
// 			}, dom)
// 		},
// 		// 操作栏-头像旁边
// 		actionsRender: (props) => {
// 			// 如果为手机端不展示操作栏
// 			if (props.isMobile) return [];
// 			if (typeof window === 'undefined') return [];
// 			// 增加操作列表
// 			return [
// 				React.createElement(Tooltip, { title: '系统通知' }, React.createElement(IconFont, { type: 'icon-xiaoxi3' })),
// 				React.createElement(Tooltip, { title: '数据大屏' }, React.createElement(IconFont, { type: 'icon-tongji' })),
// 				// 部门选择
// 				React.createElement(DataScopeSelect),
// 			];
// 		},
// 		pageTitleRender: false,
// 		childrenRender(dom, props) {
// 			return React.createElement(WaterMark, {
// 				content: `${tenant.tenantKey}-${user.nickname || user.username}${user.phoneNumber && '-' + user.phoneNumber.substr(7,4)}`,
// 				fontColor: "rgb(217 217 217 / 58%)",
// 				gapX: 180,
// 				gapY: 150
// 			}, dom)
// 		},
// 	};
// };


/* 路由发生变化 */
export function onRouteChange({ clientRoutes, location }: any) {
	const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
	if (route && route.children && route?.children.length > 0) {
		history.push(route.path + '/' + route?.children[0].path);
	}
}

/**
 * 刷新路由表
 * @param param0 
 */
export function patchClientRoutes({ routes }: any) {
	let menuRoutes: any[] = [];
	if (userInfo.leftMenu?.length || userInfo.topMenu?.length) {
		menuRoutes = transitionMenusOfRoutes([...userInfo?.leftMenu, ...userInfo?.topMenu]);
		routes[1].children.unshift(...menuRoutes);
	}
	return routes;
}


export async function render(oldRender: () => void) {
	//获取token,如果token不存在，跳转到登录页面，如果存在，获取当前用户信息
	const isAuth = getToken();
	if (!isAuth || isAuth.length === 0) {
		oldRender();
		return;
	}
	const { success, code, result } = await getCurrentUser();
	if (success && code === 200) {
		// 将权限和角色添加到全局
		localStorage.setItem('organId', result.dataScopes[0].organId);
		global.AuthorityList = [ ...result.permissions, ...result.roles ];
		global.headers.organId = localStorage.getItem('organId') || result.dataScopes[0].organId;
		userInfo = result;
		// const menu = await topAndSideMenu();
		// topUserMenus = menu.topMenus;
		// leftUserMenus = menu.leftMenus;
		// currentUserMenus = [...menu.leftMenus, ...menu.topMenus];
		oldRender();
	}
}