import { Box, CardMedia, Grid, styled, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContextProvider';
import { urlFor } from '../lib/client';

const StyledTypo = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    textShadow: '0px 3px 4px rgba(0,0,0,1)',
    lineHeight: 1
}));

export default function Banner() {

    const { promotion } = useContext(AppContext);

    return (
        <Grid
            container
            className='gradient-background'
            px={2}
            py={3.5}
            borderRadius={1.5}
            position='relative'
        >
            <Grid
                item xs={6} md={5} lg={4}
                container
                flexDirection='column'
                zIndex={5}
                justifyContent='space-between'
            >
                <StyledTypo noWrap sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                    Only available here
                </StyledTypo>
                <StyledTypo
                    sx={{
                        fontSize: { xs: '1.2rem', md: '2rem' },
                        lineHeight: 1.5,
                        fontWeight: 700,
                        alignSelf: 'center'
                    }}
                >
                    <StyledTypo component='span' style={{ fontSize: '3.5em', letterSpacing: '-5px', mr: '5px' }}>
                        {
                            promotion ? promotion.discount : '--'
                        }
                    </StyledTypo>
                    <StyledTypo component='span' style={{ fontSize: '2em', mr: '5px' }}>
                        OFF
                    </StyledTypo>
                </StyledTypo>
                <StyledTypo noWrap>
                    From {promotion ? promotion.from : '----/--/--'} to {promotion ? promotion.to : '----/--/--'}
                </StyledTypo>
            </Grid>

            {
                promotion &&
                <Box
                    position='absolute'
                    right='4%'
                    bottom='0%'
                    width='auto'
                    height='100%'
                    sx={{ overflowY: 'hidden' }}
                >
                    <CardMedia
                        component='img'
                        src={promotion?.posterImage ? urlFor(promotion.posterImage).url() : '/assets/hero6.png'}
                        alt='banner img'
                        height='100%'
                    />
                </Box>
            }
        </Grid>
    )
}