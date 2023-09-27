import { Grid, Skeleton, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledTextSkeleton = styled((props) => (
    <Skeleton
        variant='text'
        animation="wave"
        sx={{ fontSize: '1.5rem', width: { xs: '100%', sm: '260px' } }}
        {...props}
    />))`max-width: 270px`;

export default function DetailSkeleton() {
    return (
        <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, p: { xs: 1, md: 3 } }}>
            <Grid item sm
                sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'flex-end' },
                    alignItems: 'flex-start',
                    pr: { xs: 0, sm: 2 },
                    pt: '0 !important',
                    pb: 0,
                    mt: {xs: '-55px', sm: 0}
                }}
            >
                <Skeleton
                    animation="wave"
                    sx={{
                        width: 150,
                        height: {xs: 380, sm: 450}
                    }}
                />

            </Grid>
            <Grid item sm
                sx={{
                    display: 'flex',
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                    flexDirection: 'column',
                    rowGap: "5px",
                    borderLeft: 'solid 2px red',
                    pt: '0 !important',
                    marginTop: {xs: '-50px', sm: 0}
                }}
            >

                <Box sx={{width: {xs: 1, sm: 'auto'}, display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', sm: 'flex-start'}}}>
                    <Stack direction="row" spacing={1}>
                        <Skeleton animation="wave" variant='text' sx={{ fontSize: '1.5rem', width: 50 }} />
                        <Skeleton animation="wave" variant='text' sx={{ fontSize: '1.5rem', width: 50 }} />
                        <Skeleton animation="wave" variant='text' sx={{ fontSize: '1.5rem', width: 50 }} />
                    </Stack>

                    <StyledTextSkeleton />
                    
                    <StyledTextSkeleton />
                    
                    <StyledTextSkeleton />
                    
                    <StyledTextSkeleton />
                    
                    <StyledTextSkeleton />
                    
                    <StyledTextSkeleton />
                    
                    <StyledTextSkeleton />
                    
                    <StyledTextSkeleton />
                </Box>

            </Grid>
        </Grid>
    )
}