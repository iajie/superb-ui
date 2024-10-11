import React from "react";
import { IconFont } from "./format";
import { SelectProps } from "antd/lib";
import { Space } from "antd";

export interface BaseInterface {
    /** 页码 */
    current: number;
    /** 页数大小 */
    pageSize: number;
    /** 主键 */
    id: string;
    /** 数据组织ID */
    organizId: string;
    /** 数据组织名称 */
    organizName: string;
    /** 备注 */
    remarks: string;
    /** 租户ID */
    tenantId?: string;
    /** 创建人 */
    createBy: string;
    /** 创建人姓名 */
    createName: string;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
    /** 是否删除 */
    del: number;
}

export type OptionType = 'insert' | 'update' | 'info';

const iconfontData = {
    "id": "4566261",
    "name": "Superb",
    "font_family": "iconfont",
    "css_prefix_text": "icon-",
    "description": "",
    "glyphs": [
        {
            "icon_id": "521098",
            "name": "结束",
            "font_class": "jieshu",
            "unicode": "e641",
            "unicode_decimal": 58945
        },
        {
            "icon_id": "1029205",
            "name": "下载",
            "font_class": "download-1-copy",
            "unicode": "e611",
            "unicode_decimal": 58897
        },
        {
            "icon_id": "1511004",
            "name": "下载",
            "font_class": "xiazai",
            "unicode": "e60b",
            "unicode_decimal": 58891
        },
        {
            "icon_id": "1621142",
            "name": "下载",
            "font_class": "download",
            "unicode": "e706",
            "unicode_decimal": 59142
        },
        {
            "icon_id": "4275566",
            "name": "下载",
            "font_class": "xiazai1",
            "unicode": "e60c",
            "unicode_decimal": 58892
        },
        {
            "icon_id": "4579373",
            "name": "结束模板",
            "font_class": "jieshumoban",
            "unicode": "e662",
            "unicode_decimal": 58978
        },
        {
            "icon_id": "6216460",
            "name": "已结束",
            "font_class": "yijieshu",
            "unicode": "e663",
            "unicode_decimal": 58979
        },
        {
            "icon_id": "6219045",
            "name": "未开始",
            "font_class": "weikaishi",
            "unicode": "e664",
            "unicode_decimal": 58980
        },
        {
            "icon_id": "7333038",
            "name": "上传",
            "font_class": "shangchuan",
            "unicode": "e69f",
            "unicode_decimal": 59039
        },
        {
            "icon_id": "9526789",
            "name": "结束销售",
            "font_class": "jieshuxiaoshou",
            "unicode": "e613",
            "unicode_decimal": 58899
        },
        {
            "icon_id": "10299085",
            "name": "已结束",
            "font_class": "yijieshu1",
            "unicode": "e616",
            "unicode_decimal": 58902
        },
        {
            "icon_id": "10299102",
            "name": "待开始",
            "font_class": "daikaishi",
            "unicode": "e617",
            "unicode_decimal": 58903
        },
        {
            "icon_id": "11906577",
            "name": "下载",
            "font_class": "xiazai2",
            "unicode": "e6be",
            "unicode_decimal": 59070
        },
        {
            "icon_id": "12694601",
            "name": "开始_运行",
            "font_class": "kaishi_yunhang",
            "unicode": "e61a",
            "unicode_decimal": 58906
        },
        {
            "icon_id": "19460948",
            "name": "上传",
            "font_class": "shangchuan1",
            "unicode": "f0e8",
            "unicode_decimal": 61672
        },
        {
            "icon_id": "19739014",
            "name": "上传",
            "font_class": "shangchuan2",
            "unicode": "f1a9",
            "unicode_decimal": 61865
        },
        {
            "icon_id": "3877066",
            "name": "五力模型",
            "font_class": "wulimoxing",
            "unicode": "e61d",
            "unicode_decimal": 58909
        },
        {
            "icon_id": "7171163",
            "name": "财务月报表审批",
            "font_class": "shenpi1",
            "unicode": "e627",
            "unicode_decimal": 58919
        },
        {
            "icon_id": "8206767",
            "name": "模型",
            "font_class": "mx",
            "unicode": "e760",
            "unicode_decimal": 59232
        },
        {
            "icon_id": "10742547",
            "name": "自定义",
            "font_class": "zidingyi",
            "unicode": "e698",
            "unicode_decimal": 59032
        },
        {
            "icon_id": "10949568",
            "name": "自定义",
            "font_class": "zidingyi1",
            "unicode": "e66c",
            "unicode_decimal": 58988
        },
        {
            "icon_id": "11523073",
            "name": "审批",
            "font_class": "icon",
            "unicode": "e64c",
            "unicode_decimal": 58956
        },
        {
            "icon_id": "11661896",
            "name": "我的流程",
            "font_class": "wodeliucheng",
            "unicode": "e649",
            "unicode_decimal": 58953
        },
        {
            "icon_id": "33042033",
            "name": "nacos",
            "font_class": "a-nacos1",
            "unicode": "e60a",
            "unicode_decimal": 58890
        },
        {
            "icon_id": "2191444",
            "name": "视频",
            "font_class": "shipin",
            "unicode": "e609",
            "unicode_decimal": 58889
        },
        {
            "icon_id": "4628493",
            "name": "ZIP",
            "font_class": "ZIP",
            "unicode": "e63e",
            "unicode_decimal": 58942
        },
        {
            "icon_id": "5483235",
            "name": "视频",
            "font_class": "shipin1",
            "unicode": "e6c1",
            "unicode_decimal": 59073
        },
        {
            "icon_id": "18613389",
            "name": "Excel",
            "font_class": "Excel",
            "unicode": "e61c",
            "unicode_decimal": 58908
        },
        {
            "icon_id": "1903287",
            "name": "头像 女孩",
            "font_class": "icon-test",
            "unicode": "e660",
            "unicode_decimal": 58976
        },
        {
            "icon_id": "1904042",
            "name": "头像 男孩",
            "font_class": "icon-test1",
            "unicode": "e666",
            "unicode_decimal": 58982
        },
        {
            "icon_id": "1973188",
            "name": "男头像",
            "font_class": "user__easyico",
            "unicode": "e602",
            "unicode_decimal": 58882
        },
        {
            "icon_id": "4628497",
            "name": "WORD",
            "font_class": "WORD",
            "unicode": "e640",
            "unicode_decimal": 58944
        },
        {
            "icon_id": "8658143",
            "name": "金额",
            "font_class": "jine",
            "unicode": "e619",
            "unicode_decimal": 58905
        },
        {
            "icon_id": "12600859",
            "name": "ppt",
            "font_class": "ppt",
            "unicode": "e64f",
            "unicode_decimal": 58959
        },
        {
            "icon_id": "12904106",
            "name": "PDF",
            "font_class": "PDF",
            "unicode": "e615",
            "unicode_decimal": 58901
        },
        {
            "icon_id": "947482",
            "name": "商品",
            "font_class": "shangpin",
            "unicode": "e648",
            "unicode_decimal": 58952
        },
        {
            "icon_id": "2076281",
            "name": " 订单 待付款",
            "font_class": "dingdandaifukuan",
            "unicode": "e896",
            "unicode_decimal": 59542
        },
        {
            "icon_id": "3781147",
            "name": "统计",
            "font_class": "tongji",
            "unicode": "e606",
            "unicode_decimal": 58886
        },
        {
            "icon_id": "6607912",
            "name": "报表",
            "font_class": "baobiao",
            "unicode": "e608",
            "unicode_decimal": 58888
        },
        {
            "icon_id": "9591245",
            "name": "订单",
            "font_class": "dingdan",
            "unicode": "e603",
            "unicode_decimal": 58883
        },
        {
            "icon_id": "10032934",
            "name": "合同",
            "font_class": "hetong",
            "unicode": "e6a8",
            "unicode_decimal": 59048
        },
        {
            "icon_id": "12668298",
            "name": "商品编辑",
            "font_class": "shangpinbianji",
            "unicode": "e621",
            "unicode_decimal": 58913
        },
        {
            "icon_id": "13284925",
            "name": "数据字典",
            "font_class": "ccgl-shujuzidian-5-copy-copy-copy-copy",
            "unicode": "e624",
            "unicode_decimal": 58916
        },
        {
            "icon_id": "22134522",
            "name": "数据字典",
            "font_class": "shujuzidian",
            "unicode": "e601",
            "unicode_decimal": 58881
        },
        {
            "icon_id": "22818097",
            "name": "合同",
            "font_class": "hetong1",
            "unicode": "e661",
            "unicode_decimal": 58977
        },
        {
            "icon_id": "31946338",
            "name": "组织机构",
            "font_class": "zuzhijigou",
            "unicode": "e6a3",
            "unicode_decimal": 59043
        },
        {
            "icon_id": "11661954",
            "name": "组织机构管理",
            "font_class": "zuzhijigouguanli",
            "unicode": "e654",
            "unicode_decimal": 58964
        },
        {
            "icon_id": "410559",
            "name": "审批",
            "font_class": "shenpi",
            "unicode": "e65e",
            "unicode_decimal": 58974
        },
        {
            "icon_id": "588420",
            "name": "qq",
            "font_class": "qq",
            "unicode": "e65b",
            "unicode_decimal": 58971
        },
        {
            "icon_id": "734314",
            "name": "支付宝支付",
            "font_class": "zhifubaozhifu",
            "unicode": "e612",
            "unicode_decimal": 58898
        },
        {
            "icon_id": "2229631",
            "name": "icon_租户管理",
            "font_class": "icon_zuhuguanli",
            "unicode": "e893",
            "unicode_decimal": 59539
        },
        {
            "icon_id": "3086568",
            "name": "IT权限",
            "font_class": "ITquanxian",
            "unicode": "e75f",
            "unicode_decimal": 59231
        },
        {
            "icon_id": "3187395",
            "name": "消息",
            "font_class": "xiaoxi",
            "unicode": "e614",
            "unicode_decimal": 58900
        },
        {
            "icon_id": "3717794",
            "name": "成功",
            "font_class": "chenggong",
            "unicode": "e60d",
            "unicode_decimal": 58893
        },
        {
            "icon_id": "3826041",
            "name": "图片",
            "font_class": "tupian",
            "unicode": "e63a",
            "unicode_decimal": 58938
        },
        {
            "icon_id": "3901170",
            "name": "微信",
            "font_class": "weixin",
            "unicode": "e604",
            "unicode_decimal": 58884
        },
        {
            "icon_id": "5286700",
            "name": "消息",
            "font_class": "xiaoxi1",
            "unicode": "e639",
            "unicode_decimal": 58937
        },
        {
            "icon_id": "5483612",
            "name": "企业法律",
            "font_class": "qiyefalv",
            "unicode": "e70e",
            "unicode_decimal": 59150
        },
        {
            "icon_id": "6260316",
            "name": "消息",
            "font_class": "xiaoxi2",
            "unicode": "e61b",
            "unicode_decimal": 58907
        },
        {
            "icon_id": "6337586",
            "name": "菜单",
            "font_class": "caidan",
            "unicode": "e689",
            "unicode_decimal": 59017
        },
        {
            "icon_id": "6338159",
            "name": "消息",
            "font_class": "xiaoxi3",
            "unicode": "e645",
            "unicode_decimal": 58949
        },
        {
            "icon_id": "7149553",
            "name": "管理",
            "font_class": "guanli",
            "unicode": "e67c",
            "unicode_decimal": 59004
        },
        {
            "icon_id": "7333067",
            "name": "权限",
            "font_class": "quanxian",
            "unicode": "e6a0",
            "unicode_decimal": 59040
        },
        {
            "icon_id": "8206815",
            "name": "企业",
            "font_class": "qy",
            "unicode": "e769",
            "unicode_decimal": 59241
        },
        {
            "icon_id": "8312521",
            "name": "拒绝",
            "font_class": "jujue",
            "unicode": "e628",
            "unicode_decimal": 58920
        },
        {
            "icon_id": "8629253",
            "name": "图片",
            "font_class": "tupian1",
            "unicode": "e66b",
            "unicode_decimal": 58987
        },
        {
            "icon_id": "8802668",
            "name": "权限",
            "font_class": "quanxian1",
            "unicode": "e656",
            "unicode_decimal": 58966
        },
        {
            "icon_id": "9003197",
            "name": "同意",
            "font_class": "tongyi",
            "unicode": "e691",
            "unicode_decimal": 59025
        },
        {
            "icon_id": "9337519",
            "name": "系统管理员管理",
            "font_class": "xitongguanliyuanguanli",
            "unicode": "e60f",
            "unicode_decimal": 58895
        },
        {
            "icon_id": "9752800",
            "name": "企业",
            "font_class": "qiye",
            "unicode": "e610",
            "unicode_decimal": 58896
        },
        {
            "icon_id": "10299086",
            "name": "已支付",
            "font_class": "yizhifu",
            "unicode": "e600",
            "unicode_decimal": 58880
        },
        {
            "icon_id": "10319825",
            "name": "无权限",
            "font_class": "wuquanxian",
            "unicode": "e6d5",
            "unicode_decimal": 59093
        },
        {
            "icon_id": "10319859",
            "name": "无权限",
            "font_class": "wuquanxian1",
            "unicode": "e6dc",
            "unicode_decimal": 59100
        },
        {
            "icon_id": "10332476",
            "name": "消息",
            "font_class": "xiaoxi4",
            "unicode": "e605",
            "unicode_decimal": 58885
        },
        {
            "icon_id": "11672366",
            "name": "用户管理",
            "font_class": "yonghuguanli",
            "unicode": "e60e",
            "unicode_decimal": 58894
        },
        {
            "icon_id": "15933094",
            "name": "微信",
            "font_class": "weixin1",
            "unicode": "e607",
            "unicode_decimal": 58887
        },
        {
            "icon_id": "18371110",
            "name": "分享",
            "font_class": "fenxiang",
            "unicode": "e679",
            "unicode_decimal": 59001
        },
        {
            "icon_id": "18371472",
            "name": "认证1",
            "font_class": "renzheng1",
            "unicode": "e6a1",
            "unicode_decimal": 59041
        },
        {
            "icon_id": "18371473",
            "name": "认证2",
            "font_class": "renzheng2",
            "unicode": "e6a2",
            "unicode_decimal": 59042
        },
        {
            "icon_id": "18402835",
            "name": "首页，地球",
            "font_class": "shouyediqiu",
            "unicode": "e6d6",
            "unicode_decimal": 59094
        },
        {
            "icon_id": "18417907",
            "name": "已完成",
            "font_class": "yiwancheng",
            "unicode": "e6fc",
            "unicode_decimal": 59132
        },
        {
            "icon_id": "18426683",
            "name": "小视频，影视，48",
            "font_class": "xiaoshipinyingshi48",
            "unicode": "e6ff",
            "unicode_decimal": 59135
        },
        {
            "icon_id": "18429620",
            "name": "爱情，情侣",
            "font_class": "aiqingqinglv",
            "unicode": "e701",
            "unicode_decimal": 59137
        },
        {
            "icon_id": "18438239",
            "name": "天气，雨天，大雨",
            "font_class": "tianqiyutiandayu",
            "unicode": "e708",
            "unicode_decimal": 59144
        },
        {
            "icon_id": "18438254",
            "name": "天气，雨天，雷阵雨",
            "font_class": "tianqiyutianleizhenyu",
            "unicode": "e709",
            "unicode_decimal": 59145
        },
        {
            "icon_id": "18438265",
            "name": "天气，雪花，冬天",
            "font_class": "tianqixuehua",
            "unicode": "e70a",
            "unicode_decimal": 59146
        },
        {
            "icon_id": "18446834",
            "name": "天气，地址，定位",
            "font_class": "tianqidizhidingwei",
            "unicode": "e71a",
            "unicode_decimal": 59162
        },
        {
            "icon_id": "18922424",
            "name": "已失败",
            "font_class": "yishibai",
            "unicode": "e748",
            "unicode_decimal": 59208
        },
        {
            "icon_id": "18933135",
            "name": "断开，连线",
            "font_class": "duankailianxian",
            "unicode": "e74b",
            "unicode_decimal": 59211
        },
        {
            "icon_id": "19525468",
            "name": "权限-线",
            "font_class": "quanxian-xian",
            "unicode": "e62c",
            "unicode_decimal": 58924
        },
        {
            "icon_id": "19738994",
            "name": "审核",
            "font_class": "shenhe",
            "unicode": "f195",
            "unicode_decimal": 61845
        },
        {
            "icon_id": "23863263",
            "name": "数据权限",
            "font_class": "shujuquanxian",
            "unicode": "e62d",
            "unicode_decimal": 58925
        },
        {
            "icon_id": "34260209",
            "name": "审核",
            "font_class": "shenhe1",
            "unicode": "e7ed",
            "unicode_decimal": 59373
        },
        {
            "icon_id": "39509229",
            "name": "拒绝",
            "font_class": "jujue1",
            "unicode": "e730",
            "unicode_decimal": 59184
        },
        {
            "icon_id": "39546195",
            "name": "企业微信",
            "font_class": "wxwork",
            "unicode": "eac8",
            "unicode_decimal": 60104
        }
    ]
};


/**
 * 阿里云图标
 */
export const AliIcon: SelectProps['options'] = iconfontData.glyphs.map(i => ({ label: React.createElement(Space, {}, React.createElement(IconFont, { type: `icon-${i.font_class}` }), i.name), value: i.font_class }));