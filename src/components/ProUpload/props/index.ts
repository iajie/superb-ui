import { ProFormItemProps, ProFormUploadButtonProps, ProFormUploadDraggerProps } from '@ant-design/pro-components';
import { UploadProps } from "antd";

type FileProps = {
    /**
     * 图片文件上传返回的key
     */
    data: string;
    /**
     * 文件名称
     */
    name: string;
    /**
     * 图片文件上传url
     */
    url: string;
}

interface ProUploadProps extends UploadProps {
    /** 如果，为button时显示的文字 */
    uploadName?: string,
    /** 文件回显 */
    files?: FileProps[],
    /** 存储空间 */
    bucket?: string;
    /** 存放文件夹 */
    dir?: string;
    /** 是否私有 */
    auth?: string;
    /** 文件上传大小 单位：MB */
    fileSize?: number;
    /** 是否发送删除文件请求 */
    deleteSend?: boolean;
    /** 如果文件重复是否覆盖：默认是 */
    isCover?: string;
    /** 限制上传的文件类型 */
    fileType?: string[] | string;
    /** 文件上传格式，目前仅支持3种 图片组、按钮上传组、拖拽上传组, 默认picture-card */
    uploadType?: 'picture-card' | 'picture-button' | 'dragger',
    /** 上传文字 */
    buttonText?: string;
    /** 拖拽上传描述 */
    dragDescription?: string;
    /**
     * 文件上传回调
     * @param fileResponse 返回的响应数组
     * @returns 
     */
    onUpload?: (fileResponse: { name: string; url: string; data: string; }[]) => void;
}

interface ProFormUploadProps extends ProFormItemProps {
    /** 上传组件属性 */
    itemProps?: ProUploadProps | ProFormUploadButtonProps | ProFormUploadDraggerProps;
    /** 当类型为id时，默认文件上传组件只上传一张图片，ids 和 list 可受控于valueFormat, 默认keys */
    valueType?: 'key' | 'keys' | 'jsonFile' | 'jsonFiles';
    /** 组件返回值格式 */
    valueFormat?: 'string' | 'json';
    /** 最终表单提交返回的格式 可受控于valueFormat，valueType受控于jsonFile， jsonFiles */
    valueProps?: { key?: string; name?: string; },
    /** 如果文件重复是否覆盖：默认是 */
    isCover?: boolean;
    /** 存储空间 */
    bucket?: string;
    /** 存放文件夹 */
    dir?: string;
    /** 是否私有 */
    auth?: boolean;
    /** 是否发送删除文件请求 */
    deleteSend?: boolean;
    /** 限制上传的文件类型 如果为数组时则为文件后缀，如果为字符串时为文件meta类型 */
    fileType?: string[] | string | 'image' | 'word' | 'pdf' | 'zip';
}

/**
 * 获取最大文件数
 * @param valueType 值类型
 * @param itemProps 传递参数
 * @returns 
 */
export const getMaxCount = (valueType: ProFormUploadProps['valueType'], itemProps: any) => {
    return (valueType == 'key' || valueType == 'jsonFile') ? 1 : (itemProps?.maxCount || 5);
}

export {
    FileProps,
    ProUploadProps,
    ProFormUploadProps,
}