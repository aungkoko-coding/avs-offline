import { Grid } from '@mui/material';
import React from 'react';

export default function GridItem(props) {
    return (
        <Grid item flexGrow={0} flexShrink={0} xs={4} sm={4} md={3} lg={2} sx={{ alignSelf: 'stretch' }} >
            { props.children }
        </Grid>
    )
}