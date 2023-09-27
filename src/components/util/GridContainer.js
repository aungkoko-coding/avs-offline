import { Grid } from '@mui/material';
import React from 'react';

export default function GridContainer(props) {
    return (
        <Grid 
            spacing={{xs: 0.5, sm: 1}} 
            container 
            columns={{ xs: 16, sm: 20, md: 18, lg: 16 }} 
            px={{ xs: 0, sm: 3, md: 5, lg: 7 }}
        >
            { props.children }
        </Grid>
    )
}