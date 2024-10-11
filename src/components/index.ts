/*
 * @Author: ajie:ajie20999@163.com
 * @Date: 2024-07-04 09:40:33
 * @Description: 组件封装导出统一出处
 * 不建议组件封装使用const定义，其他地方会直接调用到组件，所以在component处统一处理
 */
export { default as Button } from './Button';
export type { ButtonProps } from './Button';
export { default as ProUpload } from './ProUpload';
export { default as ProFormUpload } from './ProUpload/ProFormUpload';
// export type { FileProps } from './ProUpload';
export { default as Deleted } from './Deleted';
export { default as ProFormAreaTreeSelect } from './AreaTreeSelect';
export { default as OrganTree } from './OrganTree';
export { default as ProFormOrganTreeSelect } from './OrganTreeSelect';
export { default as DataScopeSelect } from './DataScopeSelect';