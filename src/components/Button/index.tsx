import React, { CSSProperties, useState } from "react";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

/**
 * 自定义按钮
 */
export interface ButtonProps extends AntdButtonProps {
    /** 权限集合 */
    permissions?: string[] | {
        /** 权限集合 */
        value: string[];
        /** 是否全匹配 */
        allMatch?: boolean;
    };
    /** 是否为警告按钮 */
    warning?: boolean;
    /** 是否为详情按钮 */
    info?: boolean;
    /** 成功类型按钮 */
    success?: boolean;
    /** 是否主要按钮 */
    primary?: boolean;
}

/**
 * 自定义按钮
 * 增加权限属性控制显隐
 * 增加警告、详情、成功模式与danger相同，只能出现一个
 * @param param0 
 * @returns 
 */
export default ({ permissions, warning, info, success, primary, ...props}: ButtonProps) => {

    const [state, setState] = useState<{ isHover: boolean; }>();

    /**
     * 获取色彩
     * @returns 
     */
    const getStyle = () => {
        const style: CSSProperties = {};
        if (success) {
            if (props.type === 'text') {
                style.border = 'none';
                style.color = '#67C23A';
                if (state?.isHover) {
                    style.background = '#d9f7be';
                }
            } else if (props.ghost) {
                style.borderColor = '#67C23A';
                if (state?.isHover) {
                    style.color = '#FFFFFF';
                    style.background = '#67C23A';
                } else {
                    style.color = '#67C23A';
                    style.background = 'Transparent';
                }
            } else if (props.type === 'link') {
                style.color = '#67C23A';
            } else {
                style.borderColor = '#67C23A';
                style.color = '#FFFFFF';
                if (state?.isHover) {
                    style.background = '#95de64';
                    style.borderColor = '#95de64';
                } else {
                    style.background = '#67C23A';
                }
            }
        } else if (warning) {
            if (props.type === 'text') {
                style.border = 'none';
                style.color = '#E6A23C';
                if (state?.isHover) {
                    style.background = '#fffbe6';
                }
            } else if (props.ghost) {
                style.borderColor = '#E6A23C';
                if (state?.isHover) {
                    style.color = '#FFFFFF';
                    style.background = '#E6A23C';
                } else {
                    style.color = '#E6A23C';
                    style.background = 'Transparent';
                }
            } else if (props.type === 'link') {
                style.color = '#E6A23C';
            } else {
                style.borderColor = '#E6A23C';
                style.color = '#FFFFFF';
                if (state?.isHover) {
                    style.background = '#faad14';
                    style.borderColor = '#faad14';
                } else {
                    style.background = '#E6A23C';
                }
            }
        } else if (info) {
            if (props.type === 'text') {
                style.border = 'none';
                style.color = '#909399';
                if (state?.isHover) {
                    style.background = '#f0f0f0';
                }
            } else if (props.ghost) {
                style.borderColor = '#909399';
                if (state?.isHover) {
                    style.color = '#FFFFFF';
                    style.borderColor = '#909399';
                    style.background = '#909399';
                } else {
                    style.color = '#909399';
                    style.borderColor = '#909399';
                    style.background = 'Transparent';
                }
            } else if (props.type === 'link') {
                style.color = '#909399';
            }  else {
                style.borderColor = '#909399';
                style.color = '#FFFFFF';
                if (state?.isHover) {
                    style.background = '#bfbfbf';
                    style.borderColor = '#bfbfbf';
                } else {
                    style.background = '#909399';
                }
            }
        } else if (primary) {
            if (props.type === 'text') {
                style.border = 'none';
                style.color = '#85a5ff';
                if (state?.isHover) {
                    style.background = '#f0f0f0';
                }
            } else if (props.ghost) {
                style.borderColor = '#85a5ff';
                if (state?.isHover) {
                    style.color = '#FFFFFF';
                    style.borderColor = '#85a5ff';
                    style.background = '#85a5ff';
                } else {
                    style.color = '#85a5ff';
                    style.borderColor = '#85a5ff';
                    style.background = 'Transparent';
                }
            } else if (props.type === 'link') {
                style.color = '#85a5ff';
            }  else {
                style.borderColor = '#85a5ff';
                style.color = '#FFFFFF';
                if (state?.isHover) {
                    style.background = '#bfbfbf';
                    style.borderColor = '#bfbfbf';
                } else {
                    style.background = '#85a5ff';
                }
            }
        }
        if (props.style) {
            props.style = {
                ...props.style,
                ...style,
            }
        } else {
            props.style = style;
        }
        return props;
    }

    /**
     * 判断权限
     * @returns 
     */
    const authority = () => {
        if (permissions) {
            if(Array.isArray(permissions)) {
                return global.getAuthority(permissions);
            } else {
                if (permissions.value && permissions.value.length) {
                    if (permissions.allMatch) {
                        return global.getAuthority(permissions.value, true);
                    }
                    return global.getAuthority(permissions.value);
                }
                return false;
            }
        }
        return true;
    }

    return authority() && <AntdButton {...getStyle()} onMouseOver={() => setState({ isHover: true })} onMouseLeave={() => setState({ isHover: false })}></AntdButton>;
}