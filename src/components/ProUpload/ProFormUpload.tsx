import { ProFormItem, ProFormUploadButton, ProFormUploadDragger } from "@ant-design/pro-components"
import { FileProps, getMaxCount, ProFormUploadProps } from "./props"
import ProUpload from "."

/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-07-05 13:03:55
 * @Description: 表单文件上传组件 集合自定义图片上传和pro中的按钮和拖拽
 */
export default ({ 
    bucket, dir, auth = false, deleteSend, isCover = true,
    fieldProps, itemProps, valueType = 'jsonFiles', valueProps, valueFormat = 'string', ...props }: ProFormUploadProps) => {
    
    const getFiled = (form: any) => {
        const data = { fileList: initValue(form) };
        return data;
    }

    const initValue = (form: any) => {
        if (props.initialValue) {
            if (valueType == 'key' || valueType == 'keys') {
                const keys = props.initialValue.split(',');
                return keys.map((i: string) => ({ data: i, uid: i, name: i.substring(i.lastIndexOf('/') + 1), url: global.viewUrl(i) }));
            } else {
                if (valueFormat === 'json') {
                    return props.initialValue.map((i: any) => {
                        // const { result } = await getUrl(i.data, { bucket, dir, auth });
                        return { data: i.data, uid: i.data, name: i.name, url: global.viewUrl(i) };
                    }) || [];
                } else {
                    return JSON.parse(props.initialValue).map((i: any) => {
                        // const { result } = await getUrl(i.data, { bucket, dir, auth });
                        return { data: i.data, uid: i.data, name: i.name, url: global.viewUrl(i) };
                    }) || [];
                }
            }
        }
        if (props.name) {
            const fieldValue = form.getFieldValue(`${props.name}`);
            if (fieldValue && !fieldValue.fileList) {
                if (valueType == 'key' || valueType == 'keys') {
                    const keys = fieldValue.split(',');
                    return keys.map((i: string) => {
                        return { data: i, name: i.substring(i.lastIndexOf('/') + 1), url: global.viewUrl(i) };
                    });
                }
                if (valueFormat === 'json') {
                    return fieldValue.map((i: any) => {
                        return { data: i.data, name: i.name.substring(i.name.lastIndexOf('/') + 1), url: global.viewUrl(i.data) };
                    }) || [];
                } else {
                    return JSON.parse(fieldValue).map((i: any) => {
                        return { data: i.data, name: i.name.substring(i.name.lastIndexOf('/') + 1), url: global.viewUrl(i.data) };
                    }) || [];
                }
            }
        }
        return [];
    }

    /**
     * 文件传成功回调
     * @param files 文件list
     * @param form 表单
     */
    const onUpload = (files: FileProps[], form: any) => {
        let value = undefined;
        if (files && files.length) {
            if (valueType === 'key') {
                value = files[0].data;
            } else if (valueType == 'keys') {
                if (valueFormat == 'json') {
                    value = files.map(i => (i.data));
                } else {
                    value = JSON.stringify(files.map(i => (i.data)));
                }
            } else {
                if (valueProps) {
                    if (valueFormat == 'json') {
                        value = files.map(i => ({ [valueProps.key || 'key']: i.data, [valueProps.name || 'name']: i.name, url: i.url }));
                    } else {
                        value = JSON.stringify(files.map(i => ({ [valueProps.key || 'key']: i.data, [valueProps.name || 'name']: i.name, url: i.url })));
                    }
                } else {
                    if (valueFormat == 'json') {
                        value = files.map(i => ({ key: i.data, name: i.name, url: i.url }));
                    } else {
                        value = JSON.stringify(files.map(i => ({ key: i.data, name: i.name, url: i.url })));
                    }
                }
            }
        }
        form.setFieldValue(`${props.name}`, value);
    }

    return <ProFormItem shouldUpdate style={{ display: 'inline-block', width: 'auto' }}>
        {(form) => <ProFormItem {...props}>
            <ProUpload {...fieldProps} { ...itemProps } maxCount={getMaxCount(valueType, itemProps)} {...getFiled(form)}
                onUpload={(reponse: any[]) => onUpload(reponse, form)}
                disabled={props.disabled}
                auth={auth ? 'true' : 'false'} isCover={isCover ? 'true' : 'false'} />
        </ProFormItem>}
    </ProFormItem>
}