declare global {
    var ALLOCATION: string;
    var SYSTEM: string;
    var FLOWABLE: string;
    var headers: {
        /** 版本，默认灰度 */
        version: string;
        /** 租户id */
        tenantId: string;
        /** 客户端id */
        clientId: string;
        /** 鉴权头 */
        Authorization: string;
        /** 部门id */
        organId: string;
        /** 其他参数 */
        [key: string]: any;
    };
    var AuthorityList: string[];
    var BASE_URL: string;
    var themeType: string;
    var layout: boolean;
    var isProxy: boolean;
    var routes: any[];
    var getAuthority: (premissons: string[], isAll?: boolean) => boolean;
    var viewUrl: (key: string) => string;
}

export {};