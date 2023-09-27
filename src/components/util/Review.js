import InfoIcon from '@mui/icons-material/Info';
import { Box, Card, CardContent, styled, Typography } from '@mui/material';
import React from 'react';

const CardHeader = styled(Typography)({
    padding: '16px 16px 10px',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center'
});

export default function Review(props) {
    return (
        <Card 
            component={Box}
            sx={{
                backgroundColor: '#000',
                border: (theme) => `solid 2px ${theme.palette.background.paper}`
            }}
            {...props}
        >
            <CardHeader 
                color='inherit' 
                sx={{
                    fontSize: {xs: '1.2rem', sm: '1.4rem'},
                    
                }}
            >
                <InfoIcon />Review 
            </CardHeader>
            <CardContent>
                {props.message}
            </CardContent>
        </Card>
    )
}