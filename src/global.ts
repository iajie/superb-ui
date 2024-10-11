/**
 * 通用服务
 */
global.ALLOCATION = 'superb-allocation-biz';
/**
 * 系统管理
 */
global.SYSTEM = 'superb-system-biz';
/**
 * 系统管理
 */
global.FLOWABLE = 'superb-flowable-biz';
/**
 * 是否使用代理
 */
global.isProxy = true;
global.BASE_URL = 'http://gateway.superb.com';
/**
 * 请求头
 */
global.headers = {
    version: 'v1',
    versionIp: '',
    tenantId: 'superb',
    clientId: 'PC_ADMIN',
    Authorization: '',
    organId: ''
}

/**
 * 权限编码
 */
global.AuthorityList = [];

/**
 * 权限编码查看权限
 * @param perms 数组权限编码
 * @param isAll true:满足数组中所有值    false:满足数组中任意一个
 */
global.getAuthority = (perms: string[], isAll?: boolean) => {
    let list = global?.AuthorityList ?? [];
    let checker = false;
    if (isAll) {
        const checke = (arr: string[], target: string[]) => target?.every((v) => arr?.includes(v));
        checker = checke(list, perms);
    } else {
        for (let i = 0; i < perms.length; i++) {
            if (list?.includes(perms[i])) {
              checker = true;
              break;
            }
        }
    }
    return checker;
}

/**
 * 获取浏览地址
 * @param key 
 * @returns 
 */
global.viewUrl = (key: string) => {
    if (!key) {
        return '';
    }
    if (key.startsWith('http')) {
        return key;
    }
    return `https://zloss.z-srm.com/${key}`;
}
