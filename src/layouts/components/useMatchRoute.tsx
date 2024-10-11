import { useAppData } from "@umijs/max";
import { useLocation } from "@umijs/max";
import { useParams } from "@umijs/max";
import { useOutlet } from "@umijs/max";
import { useSelectedRoutes } from "@umijs/max";
import React from "react";
import { useEffect, useState } from "react";
import KeepAlive from "react-activation";

interface IMatchRouteType {
    //路由名称
    title: string;
    //访问地址
    pathname: string; //  /user/1
    //标签内容
    children: any;
    //路由地址
    routePath: string; // /user/:id
    //图标
    icon?: any;
    //是否缓存
    isCache: boolean;
    //是否外部链接
    isIframe?: boolean;
    //ifream加载的url地址
    url?: string;
}

/**********类型定义--结束***********/
export function useMatchRoute() {
    // 获取匹配到的路由
    const selectedRoutes = useSelectedRoutes();
    // 获取路由组件实例
    const children = useOutlet();
    // 获取所有路由
    const { routes } = useAppData();
    // 获取当前url
    const location = useLocation();
    const { pathname, state: locationState }: any = location;
    //匹配的路由
    const [matchRoute, setMatchRoute] = useState<IMatchRouteType | undefined>();
    //获取ifream获取ID参数
    const params = useParams();
    const { id } = params;
    // 监听pathname变了，说明路由有变化，重新匹配，返回新路由信息
    useEffect(() => {
        // 获取当前匹配的路由
        const lastRoute = selectedRoutes.at(-1);
        //判断是否匹配到理由，如果未匹配到，终止
        if (!lastRoute?.route?.path) return;
        let ifreamRoute: any | null = null;
        if (id) {
            ifreamRoute = Object.values(global?.routes).find((route: any) => route.key === id);
        } else {
            ifreamRoute = Object.values(routes).find((route: any) => route.path === pathname);
        }
        
        // 获取菜单名称
        //@ts-ignore
        const title = lastRoute?.route?.name || ifreamRoute?.name || '未知页面';
        let matchRoute: any = null;
        
        if (!locationState || (locationState && locationState.newTab)) {
            matchRoute = {
                title,
                pathname: pathname,
                routePath: lastRoute.pathname || pathname,
                icon: (lastRoute.route as any).icon,
                isCache: (lastRoute.route as any).isCache,
            };
        } else {
            matchRoute = {
                title,
                pathname: locationState.pathname,
                routePath: locationState.pathname,
                icon: (lastRoute.route as any).icon,
                isCache: false,
            };
        }
        // 不在菜单中显示问题
        if (!matchRoute.routePath) {
            matchRoute.routePath = lastRoute.route.path;
        }
        if ((lastRoute.route as any).isIframe) {
            matchRoute.isIframe = true;
            matchRoute.url = (lastRoute.route as any).path;
        } else {
            matchRoute.children = matchRoute.isCache ? <KeepAlive name={matchRoute.id}>
                <React.Suspense>{children}</React.Suspense>
            </KeepAlive> : <React.Suspense>{children}</React.Suspense>;
        }
        
        setMatchRoute(matchRoute);
    }, [pathname]);
    return matchRoute;
}
