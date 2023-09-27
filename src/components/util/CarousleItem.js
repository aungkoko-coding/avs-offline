import { Box } from '@mui/material';
import React from 'react';

export default function CarouselItem({width, children}) {
    return (
        <Box width={`${width}px`} pl='8px' >
            { children }
        </Box>
    )
}