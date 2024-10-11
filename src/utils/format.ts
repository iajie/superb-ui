import { MenuDataItem } from '@ant-design/pro-components';
import { createFromIconfontCN } from '@ant-design/icons';
import React, { lazy } from 'react';
import { Spin } from 'antd';

/**
 * 图标库组件
 */
export const IconFont = createFromIconfontCN({
	scriptUrl: [
		'//at.alicdn.com/t/c/font_4566261_u772f3gfb4.js',
		'//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overridden)
		'//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
	],
});

export const sideMenu = (menu: MenuDataItem[]) => {
	return menu.filter(item => {
		if (item.icon) {
			item.icon = React.createElement(IconFont, { type: `icon-${item.icon}` });
		}
		if (item.children && item.children.length) {
			sideMenu(item.children);
		} else {
			delete item.children
		}
		return true;
	});
}

/**
 * 重新构建菜单
 * @param menu 
 */
export const topMenu = (menu: MenuDataItem[]): any[] => {
	const arr: any[] = [];
	menu.forEach(item => {
		if (item.status == 0) {
			item = {
				label: item.name,
				path: `${item.path}`,
				disabled: item.status != 0,
				icon: item.icon ? React.createElement(IconFont, {
					type: `icon-${item.icon}`
				}) : '',
				children: item.children
			};
			if (item.children && item.children.length) {
				item.key = item.id;
				item.children = topMenu(item.children);
			} else {
				item.key = item.path;
				delete item.children
			}
			arr.push(item);
		}
	});
	return arr;
}

/**
 * 将菜单转换为路由
 * @param menus 
 */
export const transitionMenusOfRoutes = (menus: any[] = []) => {
	const routes = getRoutes(menus, []);
	global['routes'] = routes;
	return routes;
}

/**
 * 递归组装路由
 * @param menus 
 * @param routes 
 */
const getRoutes = (menus: any[] = [], routes: any[] = []) => {
	const urlRegex = /^(http|https):\/\/(\S+)$/;
	menus.forEach(item => {
		// 不是父级菜单-加载路由
		if (item.menuType !== 0) {
			// 如果时外链
			if (item.outerChain === 1 && urlRegex.test(item.path)) {
				routes.unshift({
					key: item.id,
					name: item.name,
					path: item.path,
					isIframe: true,
					icon: item?.icon,
					custom: true,
				});
			} else {
				routes.unshift({
					key: item.id,
					name: item.name,
					path: item.path,
					icon: item?.icon,
					custom: true,
					// 踩坑-- 动态路由必须使用React.Suspense包裹起来，否则会读取不到路由
					element: React.createElement(React.Suspense, { fallback: React.createElement(Spin) }, React.createElement(lazy(() => {
						try {
							return Promise.resolve(require("@/pages" + item.path));
						} catch (e: any) {
							return Promise.resolve(require("@/pages/404"));
						}
					})))
				});
			}
		}
		if (item.children && item.children.length) {
			getRoutes(item.children, routes);
		}
	});
	return routes;
}