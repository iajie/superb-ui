import theme_light from '../icon/theme_light.svg';
import theme_dark from '../icon/theme_dark.svg';
import theme_lark from '../icon/theme_lark.svg';
import theme_comic from '../icon/theme_comic.svg';
import React from 'react';
import { RadioGroupProps } from 'antd';

/**
 * 主题定义
 */
export const THEMELIST = [
    { theme: 'default', svg: theme_light, name: '默认', colorBgLayout: 'rgb(237 241 247 / 79%)', color: '#1677FF' },
    { theme: 'dark', svg: theme_dark, name: '暗黑', colorBgLayout: '#000000', color: '#1677FF' },
    { theme: 'lark', svg: theme_lark, name: '清爽（青）', colorBgLayout: 'rgb(225 237 229 / 79%)', color: '#00B96B' },
    { theme: 'comic', svg: theme_comic, name: '粉色', colorBgLayout: 'rgb(255 239 240 / 79%)', color: '#ED4192' },
];

export const themeOptions = THEMELIST.map(i => ({
    value: i.theme,
    cover: React.createElement('div', { style: { textAlign: 'center' } }, React.createElement('img', { src: i.svg, alt: i.name }), React.createElement('span', {}, i.name))
}));

export const compactOptions: RadioGroupProps['options'] = [
    {
        label: '默认',
        value: 'default'
    },
    {
        label: '紧凑',
        value: 'compact'
    },
];

export const COLOR_IMAGES = [
    { color: '#1677FF' },
    { color: '#5A54F9' },
    { color: '#9E339F' },
    { color: '#ED4192' },
    { color: '#E0282E' },
    { color: '#F4801A' },
    { color: '#F2BD27' },
    { color: '#00B96B' },
];

export const PRESET_COLORS = [
    '#1677FF',
    '#5A54F9',
    '#9E339F',
    '#ED4192',
    '#E0282E',
    '#F4801A',
    '#F2BD27',
    '#00B96B',
];