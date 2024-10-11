import { Modal, message } from "antd";
import { BaseInterface } from "@/utils/BaseInterface";
import { remove } from "./service";

/**
 * 根据id删除数据
 * @param id 
 * @param reload 
 */
export const removeById = (id: string, reload: Function) => {
    const modal = Modal.confirm({
        title: '提示',
        content: '是否删除数据？删除后数据将无法恢复！',
        onOk: async () => {
            const { success } = await remove(id);
            if (success) {
                message.success('数据删除成功！');
                modal.destroy();
                reload();
            }
        }
    });
}

/**
 * 行政区划属性
 */
export interface AllocationPositionProps extends BaseInterface {
    /** 区划名称 */ 
    name: string;
    /** 父级区划 */ 
    parentId: string;
    /** 级别 */ 
    level: number;
    /** 省级区划 */ 
    parentTop: string;
    /** 经度 */ 
    longitude: number;
    /** 纬度 */ 
    latitude: number;
}