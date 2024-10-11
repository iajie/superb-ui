const TOKEN_KEY = "TOKEN_KEY";

//获取Token
export function getToken() {
    const tokenName = getTokenKey();
    return localStorage.getItem(tokenName) || global.headers[tokenName];
}

//获取TokenKey
export function getTokenKey() {
    return localStorage.getItem(TOKEN_KEY) || 'Authorization';
}

//本地存储Token
export function setToken({ token, tokenName }: { tokenName: string; token: string; }) {
    localStorage.setItem(tokenName, token);
    localStorage.setItem(TOKEN_KEY, tokenName);
    global.headers[tokenName] = token;
}

/**
 * 删除Token
 */
export function removeToken() {
    global.headers[getTokenKey()] = '';
    localStorage.removeItem(getTokenKey());
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('organId');
    deleteCookie(getTokenKey());
    deleteCookie('satoken');
}

/**
 * 获取cookie信息
 * @param cookieName 
 * @returns 
 */
const getCookieValue = (cookieName: string) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}

/**
 * 删除cookie
 * @param name 
 */
function deleteCookie(name: string) {
    let data = new Date()
    data.setDate(data.getTime() - 1000)
    document.cookie = `${name} = ;expires= ${data.toString()}`
}