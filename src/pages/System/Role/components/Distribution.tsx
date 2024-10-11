import { Button } from "@/components";
import { getPermission } from "../props";
import { dictCode } from "@/utils/dict";
import { DownOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { ProField, ProFormSelect } from "@ant-design/pro-components";
import { getExpandedKeys, getTreeList, markTreeData, treeProps } from "@/utils/tree";
import { Alert, Checkbox, Col, Input, List, Modal, Popover, Row, Space, Tooltip, Tree, message } from "antd";
import { addDistribution, distribution, menuPermissionList, removeDistribution, rolePermission } from "../props/service";

interface DistributionProps {
    /** 权限分配弹窗标题 */
    title?: string;
    /** 角色id */
    roleId: string;
    /** 打开弹窗 */
    open: boolean;
    /** 关闭对话框 */
    onClose: () => void;
}

/**
 * 权限分配弹窗
 * @param param0 
 * @returns 
 */
const Distribution: React.FC<DistributionProps> = ({ title, roleId, ...props }) => {

    const [state, setState] = useState<any>({
        loading: false,
        single: true,
        menuCheckedIds: [],
        checkedPermisAll: false,
        treeData: [],
        treeList: [],
        autoExpandParent: true,
        expandedKeys: [],
        searchValue: '',
        searchMenuClass: '',
        selectNode: {},
        menuType: 0,
    });

    const [checkedPermis, setCheckedPermis] = useState<string[]>([]);
    const [checkedMenus, setCheckedMenus] = useState<string[]>([]);

    /**
      * 加载数据
      * @param params
      */
    const loadData = async (menuType: number, stateParams?: any) => {
        const { success, result } = await menuPermissionList(menuType);
        if (success) {
            const treeList: any[] = [];
            getTreeList(treeList, result);
            const expandedKeys = [];
            if (treeList.length > 0) {
                // 默认展开第一行
                expandedKeys.push(result[0].id);
            }
            if (stateParams) {
                setState({ ...state, ...stateParams, treeData: result, treeList, expandedKeys: expandedKeys });
            } else {
                setState({ ...state, treeData: result, treeList, expandedKeys: expandedKeys });
            }
        }
    }

    const searchTree = (value: string) => {
        const { treeData, treeList } = state;
        const expandedKeys = getExpandedKeys(value, treeList, treeData);
        setState({ ...state, expandedKeys: expandedKeys, autoExpandParent: true, searchValue: value });
    }

    /**
     * 展开树
     * @param expandedKeys
     */
    const treeExpand = (expandedKeys: any[]) => {
        setState({ ...state, expandedKeys: expandedKeys, autoExpandParent: false });
    }

    /**
     * 树节点渲染
     * @param data 
     * @returns 
     */
    const mark = (data: any[]): any[] => {
        const { searchValue } = state;
        if (searchValue) {
            return markTreeData(searchValue, data);
        }
        return data;
    }

    useEffect(() => {
        loadData(state.menuType);
        //通过角色id获取 已有菜单权限
        rolePermission(roleId).then(({ result }) => {
            setCheckedPermis(result.permissionIds);
            setCheckedMenus(result.menuIds);
        });
    }, []);

    /**
     * 勾选菜单/权限
     * @param value 选中值
     * @param selected 选中/取消
     */
    const onCheck = async (value: any, checked: boolean, source: 'tree' | 'checkbox') => {
        let res, permissionIds = [];
        if (checked) {
            if (state.single) {
                res = await addDistribution(roleId, value, source);
                if (res.success) {
                    message.success('角色权限更新成功！');
                }
            } 
            permissionIds = source == 'checkbox' ? addPermis([value]) : addCheckedMenus([value]);
        } else {
            if (state.single) {
                res = await removeDistribution(roleId, value, source);
                if (res.success) {
                    message.success('角色权限更新成功！');
                }
            } 
            permissionIds = source == 'checkbox' ? removePermis([value]) : removeCheckedMenus([value]);
        }
        source == 'tree' ? setCheckedMenus(permissionIds) : setCheckedPermis(permissionIds);
    }

    /**
     * 是否在选中菜单
     * @param id
     * @returns
     */
    const isCheckedPermis = (id: string) => {
        return checkedPermis.some((item: any) => item === id);
    }

    /**
     * 删除权限
     * @param id
     */
    const removePermis = (ids: any[]) => {
        let arr = [...checkedPermis];
        for (const i in ids) {
            const id = ids[i];
            const is = isCheckedPermis(id);
            if (is) {
                arr = arr.filter((item) => item != id);
            }
        }
        return arr;
    }

    /**
     * 添加权限
     * @param id
     */
    const addPermis = (ids: any[]) => {
        const arr = [...checkedPermis];
        for (const i in ids) {
            const id = ids[i];
            const is = isCheckedPermis(id);
            if (!is) {
                arr.push(id);
            }
        }
        return arr;
    }

    /**
     * 是否在选中菜单
     * @param id
     * @returns
     */
    const isCheckedMenu = (id: string) => {
        return checkedMenus.some((item: any) => item === id);
    }

    /**
     * 添加菜单
     * @param id
     */
    const addCheckedMenus = (ids: any[]) => {
        const arr = [...checkedMenus];
        for (const i in ids) {
            const id = ids[i];
            const is = isCheckedMenu(id);
            if (!is) {
                arr.push(id);
            }
        }
        return arr;
    };

    /**
     * 删除菜单
     * @param id
     */
    const removeCheckedMenus = (ids: any[]) => {
        let arr = [...checkedMenus];
        for (const i in ids) {
            const id = ids[i];
            const is = isCheckedMenu(id);
            if (is) {
                arr = arr.filter((item) => item != id);
            }
        }
        return arr;
    };

    const markPermis = (perms: any[]) => {
        return perms.map(i => {
            const dataSource = [{ title: '描述', description: i.remarks }];
            const content = <List
                size="small"
                bordered
                dataSource={dataSource}
                renderItem={(item, l) => <List.Item key={l}>
                    <List.Item.Meta title={item.title} description={item.description} />
                </List.Item>}
            />
            return <Col key={i.id} span={8}>
                <Popover content={content} title={`权限描述[${i.name}]`}>
                    <Checkbox onChange={({ target }) => onCheck(target.value, target.checked, 'checkbox')} checked={isCheckedPermis(i.id)} value={i.id}>
                        <p style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'inline-block',
                            width: '120px',
                            position: 'relative',
                            top: '10px',
                        }}>
                            {i.name}
                        </p>
                    </Checkbox>
                </Popover>
            </Col>
        });
    }

    /**
     * 是否批量
     * @param e 
     */
    const singleChange = (e: any) => {
        const checked = e.target.checked;
        setState({ ...state, single: !checked });
    }

    /**
     * 反选
     */
    const invertSelect = () => {
        let permissionIds: any[] = [];
        let menuIds: any[] = [];
        getPermission(menuIds, permissionIds, state.treeData);
        menuIds = menuIds.filter((item) => !checkedMenus.includes(item));
        permissionIds = permissionIds.filter((item) => !checkedPermis.includes(item));
        setCheckedMenus(menuIds);
        setCheckedPermis(permissionIds);
    }

    /**
     * 全选
     * @param e 
     */
    const allChange = (e: any) => {
        const checked = e.target.checked;
        let permissionIds: any[] = [];
        let menuIds: any[] = [];
        getPermission(menuIds, permissionIds, state.treeData);
        if (checked) {
            permissionIds = addPermis(permissionIds);
            menuIds = addCheckedMenus(menuIds);
        } else {
            permissionIds = removePermis(permissionIds);
            menuIds = removeCheckedMenus(menuIds);
        }
        setCheckedMenus(menuIds);
        setCheckedPermis(permissionIds);
        setState({ ...state, checkedPermisAll: checked });
    }

    /**
     * 多选情况保存
     */
    const onSubmit = async () => {
        setState({ ...state, loading: true });
        // 选中的菜单项和权限项
        const { success } = await distribution(roleId, checkedPermis, checkedMenus);
        setState({ ...state, loading: false });
        if (success) {
            message.success('角色权限更新成功');
        }
    }

    return <Modal
        title={title || "权限分配"}
        width='50%'
        open={props.open}
        onClose={props.onClose}
        onCancel={props.onClose}
        maskClosable={false}
        footer={!state.single && <Button type="primary" loading={state.loading} onClick={onSubmit}>保存</Button>}
        destroyOnClose>
        <Row>
            <Col span={6}>
                <Input.Search placeholder="搜索菜单" onSearch={searchTree} enterButton allowClear />
            </Col>
            <Col span={6} offset={1}>
                <ProFormSelect
                    label="菜单分类"
                    placeholder="请选择菜单分类"
                    params={{ dictType: 'MenuType' }}
                    fieldProps={{
                        value: state.menuType,
                        onSelect: (value: any) => {
                            loadData(value, { menuType: value });
                        }
                    }}
                    request={dictCode} />
            </Col>
            <Col span={10} offset={1} style={{ paddingTop: '5px' }}>
                <Space>
                    <Checkbox onChange={singleChange}>批量操作</Checkbox>
                    {state.single ? null : <>
                        <Checkbox onChange={allChange}>{state.checkedPermisAll ? '取消全选' : '全选'}</Checkbox>
                        <Button type="primary" size="small" onClick={invertSelect}>反选</Button>
                    </>}
                </Space>
            </Col>
        </Row>
        <Row>
            <Col sm={24}>
                <Tree
                    blockNode
                    checkedKeys={checkedMenus}
                    showLine={{ showLeafIcon: false }}
                    switcherIcon={<DownOutlined />}
                    fieldNames={treeProps}
                    height={450}
                    treeData={mark(state.treeData)}
                    autoExpandParent={state.autoExpandParent}
                    expandedKeys={state.expandedKeys}
                    onExpand={treeExpand}
                    titleRender={(node) => <Row>
                        <Col sm={6}>
                            <Tooltip placement="right" title={<>{node.name}(<ProField mode="read" valueType='select' text={node.type} params={{ dictType: 'MenuType' }} request={dictCode} />){' '}</>}>
                                <Checkbox onChange={({ target }) => onCheck(target.value, target.checked, 'tree')} checked={isCheckedMenu(node.id)} value={node.id}>
                                    {' '}{node.name}
                                </Checkbox>
                            </Tooltip>
                        </Col>
                        <Col sm={18}>
                            {
                                node.menuType === 1 ? (node?.permissions?.length > 0 ?
                                    <Alert style={{ background: 'none' }} message={<Row>{markPermis(node?.permissions)}</Row>} type="info" /> :
                                    <Alert style={{ background: 'none' }} message={'暂无权限'} />) : ''
                            }
                        </Col>
                    </Row>}
                    selectable={false} />
            </Col>
        </Row>
    </Modal>
}

export default Distribution;