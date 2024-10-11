/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-05-31 18:16:40
 * @Description: 
 */
import { message, Upload, UploadFile, Image, Button } from "antd";
import { ProUploadProps } from "./props";
import { useState } from "react";
import { InboxOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { deleteByKey, uploadApi } from "@/services/upload.service";
import { IconFont } from "@/utils/format";

/**
 * 自定义高级表单上传
 * 基于ProForm+Upload封装，去适配ProForm表单
 * @param props 
 * @returns 
 */
export default (props: ProUploadProps) => {

    const { files, uploadName, dir = '', bucket = '', auth = 'false', fileSize = 5, deleteSend = false, 
        buttonText, dragDescription = '支持单次或批量上传。请勿上传敏感数据！',
        isCover = 'true', onUpload, disabled = false, fileType, uploadType = 'picture-card', ...uploadProps } = props;
    
    const [fileList, setFileList] = useState<UploadFile[]>(uploadProps.fileList || []);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    /**
     * 文件上传前校验
     * @param file 
     * @returns 
     */
    const beforeUpload = (file: UploadFile) => {
        const { name, type, size } = file;
        if (fileType) {
            if (Array.isArray(fileType) && fileType.length) {
                const suffix = name.substring(name.lastIndexOf('.') + 1);
                if (!fileType.includes(suffix)) {
                    message.error(`请上传后缀为[${fileType.join('、')}]的文件!`);
                    return false;
                }
            } else {
                const isImage = type?.indexOf(fileType.toString()) != -1;
                if (!isImage) {
                    message.error(`请上传类型为${fileType}的文件！`);
                    return false;
                }
            }
        }
        // 是否超过定义大小
        const sizeFlag = (size || 0) / 1024 / 1024 < fileSize;
        if (!sizeFlag) {
            message.error(`图片大小不能超过${fileSize}MB!`);
            return false;
        }
    }

    /**
     * 自定义上传
     * @param props 
     */
    const onCustomRequest = async (props: any) => {
        const { file, onError, onProgress, onSuccess, data, headers } = props;
        const formData = new FormData();
        formData.append('file', file);
        const response = await uploadApi(formData, { ...headers});
        if (response.code == 200 || response.code == 306) {
            file.data = response.result;
            // const { result } = await getUrl(response.result, headers);
            file.url = global.viewUrl(response.result);
            if (onUpload) {
                onUpload([...fileList, file]);
            }
            onProgress({ percent: 100 });
            setFileList([...fileList, file]);
            onSuccess(response, file);
        } else {
            onError();
        }
    }

    /**
     * 自定义预览
     * @param file 
     */
    const handlePreview = async (file: UploadFile) => {
        const { type, url, preview } = file;
        if ((type && type.indexOf('image/') != -1) || 
            url?.includes('.jpg') || url?.includes('.jpeg') || url?.includes('.png') || url?.includes('.gif') || 
            url?.includes('.JPG') || url?.includes('.JPEG') || url?.includes('.PNG') || url?.includes('.GIF')) {
            setPreviewImage(url || (preview as string));
            setPreviewOpen(true);
        } else {
            return window.open(url, '_target');
        }
    }

    /**
     * 删除文件
     * @param file 
     */
    const handleRemove = async (file: UploadFile | any) => {
        if (deleteSend && !disabled) {
            const { success } = await deleteByKey(file.data, { dir, auth, bucket });
            if (success) {
                const filteredFileList = fileList.filter((item) => item.uid !== file.uid);
                setFileList(filteredFileList);
            }
        } else {
            const filteredFileList = fileList.filter((item) => item.uid !== file.uid);
            setFileList(filteredFileList);
        }
    }

    return <>
        { uploadType == 'picture-card' || uploadType == 'picture-button' ? <Upload {...uploadProps} headers={{ dir, bucket, auth, isCover }} 
            beforeUpload={beforeUpload} 
            customRequest={onCustomRequest} 
            onPreview={handlePreview} 
            fileList={fileList} 
            disabled={false}
            listType={uploadType == 'picture-card' ? 'picture-card' : 'picture'}
            onRemove={handleRemove}
            showUploadList={{
                // 只读不显示删除图标
                showRemoveIcon: !disabled
            }}
            iconRender={(file) => {
                // 自定义显示pdf和word
                const { type = '', url = '' } = file;
                if ((type.indexOf('pdf') > -1 || url?.includes('.pdf'))) {
                    return <IconFont type="icon-PDF" style={{ height: '100%', display: 'inherit' }}/>
                } else if ((type.indexOf('word') > -1 || url?.includes('.doc') || url?.includes('.docx'))) {
                    return <IconFont type="icon-WORD" style={{ height: '100%', display: 'inherit' }}/>
                } else if ((type.indexOf('audio') > -1 || type.indexOf('video') > -1) || url?.includes('.mp4')) {
                    return <IconFont type="icon-shipin1" style={{ height: '100%', display: 'inherit' }}/>
                } else {
                    return <IconFont type="icon-icon_zuhuguanli" style={{ height: '100%', display: 'inherit' }}/>
                }
            }}>
                {
                    uploadType == 'picture-card' ? 
                    (fileList.length < (uploadProps?.maxCount || 9) && !disabled) && 
                    <PlusOutlined /> : <Button icon={<UploadOutlined />}>{buttonText || '上传'}</Button>
                }
        </Upload> : 
        <Upload.Dragger {...uploadProps} headers={{ dir, bucket, auth, isCover }}
            beforeUpload={beforeUpload} 
            customRequest={onCustomRequest} 
            onPreview={handlePreview} 
            fileList={fileList} 
            onRemove={handleRemove}
            showUploadList={{
                // 只读不显示删除图标
                showRemoveIcon: !disabled
            }}>
            <p className="ant-upload-drag-icon" style={{ width: '300px' }}>
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">{ buttonText || '点击或拖拽上传' }</p>
            <p className="ant-upload-hint">{dragDescription}</p>
        </Upload.Dragger> }
        {previewImage && (
            <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
            />
        )}
    </>;
}