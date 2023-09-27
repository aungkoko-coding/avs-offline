import React from 'react';
import { Paper, Typography, Box, CardMedia } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { urlFor } from '../lib/client';
import Carousel from 'react-material-ui-carousel';

export default function Scenes({ scenes }) {
    return (
        <React.Fragment>
            {
                scenes && scenes.length >= 1 &&
                <Paper
                    elevation={1}
                    sx={{
                        width: 1,
                        py: 2,
                        overflowX: 'auto',
                        mt: 3,
                    }}
                >
                    <Typography
                        variant='h6'
                        textAlign='center'
                        sx={{
                            mb: 2,
                            color: (theme) => theme.palette.primary.main,
                        }}
                    >
                        Scene{scenes?.length > 1 ? 's' : ''}
                    </Typography>
                    <Carousel
                        fullHeightHover={false}
                        navButtonsAlwaysVisible={scenes?.length > 1}
                        animation='slide'
                        navButtonsProps={{
                            style: {
                                color: '#fff',
                                backgroundColor: alpha('#ff4081', 0.7)
                            }
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                color: '#ff4081'
                            }
                        }}
                    >
                        {
                            scenes?.map((scene, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 1,
                                        height: { xs: 250, md: 350 },
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        src={urlFor(scene).url()}
                                        alt=''
                                        loading="lazy"
                                        sx={{
                                            width: { xs: 'auto', sm: 450, md: 600 },
                                            height: 1,
                                            border: (theme) => `solid 1px ${alpha(theme.palette.primary.main, 0.5)}`
                                        }}
                                    />
                                </Box>
                            ))
                        }
                    </Carousel>
                </Paper>
            }
        </React.Fragment>

    )
}