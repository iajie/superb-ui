import request from "@/utils/request";

export const uploadApi = async (file: any, headers: any) => {
    return request(`/api/${global.ALLOCATION}/file/upload`, {
        method: 'POST',
        headers,
        data: file,
    });
}

export const getUrl = async (key: any, headers: any) => {
    return request(`/api/${global.ALLOCATION}/file/url`, {
        method: 'GET',
        headers,
        params: { key }
    });
}

export const view = async (key: any, headers: any) => {
    return request(`/api/${global.ALLOCATION}/file/view`, {
        method: 'GET',
        headers,
        params: { key }
    });
}

export const deleteByKey = async (key: any, headers: any) => {
    return request(`/api/${global.ALLOCATION}/file/delete`, {
        method: 'GET',
        headers,
        params: { key }
    });
}