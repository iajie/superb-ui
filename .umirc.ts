import { defineConfig } from '@umijs/max';

export default defineConfig({
	publicPath: "/",
	fastRefresh: true,
	antd: {
		configProvider: {},
		appConfig: {},
	},
	access: {},
	history: {
		type: 'hash'
	},
	hash: true,
	/**
	 * dvajs和redux配置，开启model.ts操作，灵活获取全局变量和监听
	 */
	dva: {
		immer: { immer: true, hmr: false },
	},
	/**
	 * @name <head> 中额外的 script
	 * @description 配置 <head> 中额外的 script
	 */
	headScripts: [
		// 解决首次加载时白屏的问题
		{ src: "/scripts/loading.js", async: true },
	],
	model: {},
	initialState: {},
	request: {},
	// layout: {
	// 	title: 'Superb',
	// },
	/**
	 * 关闭layout，自定义，这边主要针对于主题定制，在app.ts中定义不生效
	 */
	layout: false,
	proxy: {
		'/api': {
			target: 'http://gateway.superb.com/',
			changeOrigin: true,
			pathRewrite: { '^/api': '' }
		}
	},
	routes: [
		{ path: '/home', redirect: '/' },
		{ name: '首页', path: '/', component: './Home' },
		{ path: '/login', layout: false, component: './Login' },
		{ path: '/theme', name: '主题设置', custom: true, component: './ThemeSetting', },
		{ path: '/user/settings', name: '个人设置', custom: true, component: './User', },
		{ path: '/user/notice', name: '系统通知', custom: true, component: './Notice', },
		{ path: '/*', component: '@/pages/404' },
		{ path: '/iframe/:id', component: './iFrame', custom: true, },
	],
	npmClient: 'yarn',
});

