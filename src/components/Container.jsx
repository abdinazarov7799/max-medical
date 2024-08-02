import React from 'react';
import {theme} from "antd";

const Container = ({children}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    return (
        <div style={{
            margin: "0 auto",
            padding: 16,
            paddingBottom: isIOS ? 220 : 16,
            borderRadius: 5,
            width: "100%",
            backgroundColor: colorBgContainer,
        }}>
            {children}
        </div>
    );
};

export default Container;
