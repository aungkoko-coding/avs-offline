import { Grid, Box, Typography, CardMedia } from '@mui/material';
import React from 'react';

export default function NotFoundError({message}) {

    return (
        <Grid container direction='column' alignItems='center'>
            <Grid item xs={4} container justifyContent='center'>
                <Box>
                    <CardMedia
                        component='img'
                        src='/assets/result_not_found.png'
                        alt='404 Result Not Found!'
                        sx={{maxWidth: {xs: '95%', sm: 500}}}
                    />
                </Box>

            </Grid>

            <Typography variant='h6' sx={{color: (theme) => theme.palette.info.light}}>
                { message }
            </Typography>
        </Grid>
    )
}