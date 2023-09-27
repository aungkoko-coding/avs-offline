import { Card, CardContent, CardMedia, Skeleton } from '@mui/material';
import React from 'react';

export default function MovieItemSkeleton(props) {
    return (
        <Card sx={{cursor: 'pointer'}}>
            <CardMedia
                component={Skeleton}
                variant="rectangular"
                sx={{height: {xs: 150, sm: 190}}}
            />
            <CardContent sx={{pt: 1, paddingBottom: '8px !important'}}>
                <Skeleton variant="text" />
            </CardContent>
        </Card>
    )
}