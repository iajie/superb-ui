import { request, history, AxiosResponse } from "@umijs/max";
import { getToken, getTokenKey, removeToken } from "./auth";
import { message as Message, Modal, notification } from 'antd';

/**
 * 警告错误
 */
const warnCode: number[] = [526, 522];

/**
 * 鉴权
 */
const authCode: number[] = [400, 406];


/**
 * 接口响应错误码
 */
const codeMessage: any = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

export interface CustomResponse {
    /** 响应码 */
    code: number;
    /** 响应消息 */
    message: string;
    /** 响应结果 */
    result: any;
    /** 响应是否成功 */
    success: boolean;
    /** 其他参数 */
    [key: string]: any;
}

/**
 * 异常处理程序
 * @param error 捕获异常 
 * @returns 
 */
const errorThrower = async (error: { response: AxiosResponse }) => {
    const errResponse: CustomResponse = { code: 500, message: '', result: '', success: false };
    const { response } = error;
    if (response && response.status) {
        if (response.status == 406) {
            removeToken();
            window.location.href = '/login';
        } else {
            const errorText = codeMessage[response.status] || response.statusText;
            notification.error({
                message: `请求错误 ${response.status}: ${response.data.path}`,
                description: errorText,
            });
            errResponse.code = response.status;
            errResponse.message = errorText;
            errResponse.result = response.data.path;
        }
    } else if (!response) {
        notification.warning({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
        errResponse.message = '网络异常';
        errResponse.result = '您的网络发生异常，无法连接服务器';
    }
    return errResponse;
};

interface IOptions {
    /** 请求方法，暂时只支持GET和POST */
    method?: 'POST' | 'post' | 'GET' | 'get';
    /** GET请求参数格式为json */
    params?: any;
    /** POST请求参数 */
    data?: any;
    /** 请求头 */
    headers?: any;
    [key: string]: any;
}

/**
 * @author: 阿杰
 * 自定义封装请求
 * 自带@umijs/max-request需要插件，但文档并未说清楚在哪加插件
 * 这里直接自己处理了，无需到app.ts中注册插件，都大同小异
 */
export default async (url: string, options?: IOptions): Promise<CustomResponse> => {
    const response = await request(url, {
        ...options,
        timeout: 10000,
        timeoutErrorMessage: '数据请求超时',
        skipErrorHandler: false,
        withCredentials: false, // 禁止携带cookie
        requestInterceptors: [
            (url: string, options: any) => {
                const headers = options.headers ? { ...global.headers, ...options.headers, } : [];
                const isToken = getToken() !== null ? true : false;
                headers['organId'] = localStorage.getItem('organId') || global.headers['organId'];
                if (isToken) {
                    headers[getTokenKey()] = getToken();
                } else {
                    history.push(`/login`);
                }
                let Neurl = url.substring(4, url.length);
                options['headers'] = headers;
                return { url: !global.isProxy ? global.BASE_URL + Neurl : url, options };
            }
        ],
        responseInterceptors: [
            async (response: any) => {
                if (response.request.responseType === "blob") {
                    return response;
                }
                const { data } = response;
                const { success, code, result, message } = data;
                if (code === 411) {
                    const modal = Modal.warning({
                        title: '是否重新登录',
                        content: message,
                        onCancel: () => modal.destroy(),
                        onOk: () => {
                            removeToken();
                            modal.destroy();
                            window.location.href = '/login';
                        }
                    })
                } else if (code == 407) {
                    // 下线
                    const modal = Modal.warning({
                        title: '下线通知',
                        content: result,
                        onCancel: () => modal.destroy(),
                        onOk: () => {
                            removeToken();
                            modal.destroy();
                            window.location.href = '/login';
                        }
                    });
                } else if (warnCode.includes(code)) {
                    Message.warning(message);
                } else if(authCode.includes(code)) {
                    Message.error(`${message}---${result}`);
                    removeToken();
                    history.push('/login');
                } else {
                    if (!success) {
                        if (code == 306) {
                            return response as CustomResponse;
                        }
                        if (result) {
                            Message.error(`${message}---${result}`);
                        } else {
                            Message.error(message);
                        }
                    }
                }
                return response as CustomResponse;
            }
        ]
    }).catch(errorThrower);
    // @ts-ignore 忽略结果未定义警告
    return Promise.resolve(response);
}