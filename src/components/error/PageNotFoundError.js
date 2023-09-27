import { Grid, Box, Typography, CardMedia } from '@mui/material';
import React, { useEffect } from 'react';

export default function PageNotFoundError(props) {

    useEffect(() => {
        document.title = 'AVS | Page Not Found';
    }, []);

    return (
        <Grid container direction='column' alignItems='center' sx={{mt: 2}}>
            <Grid item xs={4} container justifyContent='center'>
                <Box>
                    <CardMedia
                        component='img'
                        src='/assets/page_not_found.png'
                        alt='404 Page Not Found!'
                        sx={{maxWidth: {xs: '95%', sm: 500}}}
                    />
                </Box>

            </Grid>

            <Typography variant='h5' sx={{p: 2, textAlign: 'center'}}>
                The page you are currently looking at couldn't be found!
            </Typography>

        </Grid>
    )
}