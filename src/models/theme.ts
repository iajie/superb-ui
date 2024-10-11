import { useModel } from "@umijs/max"; 

export default {
    namespace: 'userTheme',
    // 初始状态
    state: {
        colorBgLayout: 'rgb(237 241 247 / 79%)',
        colorPrimary: '#1677ff',
        borderRadius: 6,
        themeType: 'default',
        compact: 'default'
    },
    // 更改状态的逻辑
    reducers: {
        showData: (state: any, { payload }: any) => {
            return { ...state, ...payload };
        },
    },
    // 订阅状态变化
    subscriptions: {
        setup({ dispatch, history }: any) {
            dispatch({
                type: 'getThemeData',
                payload: {
                    key: '@@initialState'
                }
            });
        },
    },
    effects: {
        /**
         * 获取主题
         * @param param0 
         * @param param1 
         */
        *getThemeData({ payload }: any, { put, call }: any) {
            // 获取全局用户状态数据
            const { initialState } = yield call(useModel, payload.key);
            const { remarks } = initialState?.user || {};
            let themeData = {
                colorBgLayout: 'rgb(237 241 247 / 79%)',
                colorPrimary: '#1677ff',
                borderRadius: 6,
                themeType: 'default',
                compact: 'default',
            };
            if (remarks && remarks.themeData) {
                themeData = remarks.themeData;
            }
            yield put({
                type: 'showData',
                payload: themeData
            });
        },
        /**
         * 设置主题
         * @param param0 
         * @param param1 
         */
        *setThemeData({ payload }: any, { put }: any) {
            yield put({
                type: 'showData',
                payload: payload.themeData
            });
        },
    }
};