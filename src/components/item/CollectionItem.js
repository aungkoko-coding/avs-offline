import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../lib/client';

import Star from '@mui/icons-material/Star';
import { Box, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';

// Responsible for rendering for each movie items
export default function CollectionItem({ data: { name, posterImgUrl, posterImage, slug } }) {

    return (
        <Card sx={{width: '100%', height: '100%', m: 0, p: 0}}>
            <CardActionArea sx={{width: '100%', height: '100%'}} LinkComponent={Link} to={`/collections/${slug?.current}`}>
                <CardMedia
                    component="img"
                    src={posterImgUrl}
                    loading="lazy"
                    sx={{ height: '85%', lineHeight: 1, verticalAlign: 'baseline' }}
                />
                <CardContent sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-start', 
                    alignItems: 'center', 
                    py: 1, 
                    height: '15%' 
                }}>
                    <Tooltip title={name}>
                        <Typography noWrap variant='subtitle2'>{name}</Typography>
                    </Tooltip>
                </CardContent>
                
            </CardActionArea>
        </Card>
    )
}