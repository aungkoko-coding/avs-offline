import { Typography } from '@mui/material';
import React from 'react';

export default function BrandName({ responsiveMode = false, mdScreen = false, domEle, fontSize = 2}) {

    const fontSize2 = fontSize / 2 * 1.4;

    return (
        <Typography
            variant="h6"
            component={domEle || "a"}
            href="/"
            sx={{
                ...(responsiveMode ? 
                    { 
                        display: { xs: mdScreen ? 'none' : 'flex', md: mdScreen ? 'flex' : 'none' }, 
                    } : 
                    { display: 'inline-flex'}),
                justifyContent: mdScreen ? 'flex-start' : 'center',
                alignItems: 'flex-end',
                fontFamily: 'monospace',
                textDecoration: "none",
                color: 'inherit',
                userSelect: 'none'
            }}
        >
            <span style={{ color: "#ff4081", padding: 0, lineHeight: 1, fontSize: `${parseFloat(fontSize)}rem`, fontWeight: 700 }}>
                A
            </span>
            <span style={{ color: "#90caf9", padding: 0, lineHeight: 1, fontSize: `${parseFloat(fontSize2)}rem`,}}>
                VS
            </span>
        </Typography>
    )
}