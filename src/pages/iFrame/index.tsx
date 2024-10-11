import React, { useEffect, useState } from "react";

/**
 * 内嵌iframe
 * @param props 
 * @returns 
 */
const IFrame: React.FC<any> = (props: any) => {
    
    // 获取当前url
    const [pageLoading, setPageLoading] = useState<boolean>(true);

    useEffect(() => {
        
        if (pageLoading === false) {
            //登录页面
            window.addEventListener(
                'message',
                function (e) {
                    const { data } = e;
                    if (data.type && data.type === 'login') {
                        window.removeEventListener('message', () => { }, false);
                        window.location.reload();
                    }
                },
                false,
            );
        }
    }, [pageLoading]);

    return <iframe
        scrolling="yes"
        frameBorder="0"
        onLoad={() => {
            setPageLoading(false);
        }}
        src={props.url}
        style={{
            width: '100%',
            height: 'calc(100vh - 148px)',
            overflow: 'visible',
            overflowY: 'hidden',
        }} />
}

export default IFrame;