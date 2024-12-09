import React, { useEffect } from 'react';
import { message } from 'antd';
import "./index.css";
const CMessageCopied = ({ content, setCopied, copied }: any) => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (copied) {
            const messageInstance = messageApi.open({
                type: 'success',
                content: content,
                className: 'custom-class',
                style: {
                    marginTop: '20vh',
                },
            });

            const closeDuration = 100;
            const closeTimer = setTimeout(() => {
                messageInstance.then(() => {
                    setCopied(false);
                });
            }, closeDuration);

            return () => clearTimeout(closeTimer);
        }
    }, [content, messageApi, setCopied, copied]);

    return (
        <>
            {contextHolder}
        </>
    );
};

export default CMessageCopied;