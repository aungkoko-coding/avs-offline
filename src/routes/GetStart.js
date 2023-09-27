import { alpha, Avatar, Box, Button, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandName from '../components/BrandName';
import DocumentHeader from '../components/util/DocumentHeader';

const VideoIcon = styled((props) => (
    <Avatar
        src="/assets/video_icon.png"
        alt="video icon"
        imgProps={{
            loading: 'lazy'
        }}
        sx={{
            width: 70,
            height: 70,
            position: 'absolute',
            zIndex: -10,
            opacity: 0.5,
        }}
        {...props}
    />
))({ color: 'inherit' })

export default function GetStart(props) {

    let navigate = useNavigate();

    function navigateTo() {
        localStorage.setItem("visited", true);
        const recentUrl = localStorage.getItem('recentUrl') || '/';
        localStorage.removeItem('recentUrl');
        navigate(recentUrl);
    }
    return (
        <Box
            component='main'
            sx={{
                backgroundImage: 'url("/assets/hero.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '100% 100%',
                backgroundSize: { xs: '60%', lg: '40%' },
                flexGrow: 1,
                marginBottom: '-8px',
                padding: '12px',
                position: 'relative'
            }}
        >
            <DocumentHeader title='AVS | Getting Started' />
            <Grid container sx={{ mt: 2, mx: { xs: 0, md: 1 } }}>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <BrandName fontSize={6} domEle="h1" />
                    <Typography variant='subtitle1'>
                        (<span style={{ color: "#ff4081" }}>AKK</span> <span style={{ color: "#90caf9" }}>Videos Shop</span>)
                    </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography
                        variant='caption'
                        sx={{
                            mt: 2,
                            lineHeight: 1,
                            fontSize: { xs: '1.2rem', sm: '2rem' },
                            color: (theme) => alpha(theme.palette.text.primary, 0.9),
                            textShadow: '0 0 7px #000'
                        }}
                    >
                        is a place from where you can collect your preferable Movies or Tv Series and watch them offline by
                        spending starting only from 300 Ks!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        sx={{ mt: 2, fontWeight: 700 }}
                        onClick={() => navigateTo("/")}
                    >
                        Get Started
                    </Button>
                </Grid>
            </Grid>

            <VideoIcon
                sx={{
                    bottom: '10%',
                    left: "40%",
                    transform: 'rotate(30deg)'
                }}
            />
            <VideoIcon
                sx={{
                    bottom: '20%',
                    left: "50%",
                    transform: 'rotate(-30deg)'
                }}
            />
            <VideoIcon
                sx={{
                    bottom: '83%',
                    left: "70%",
                    transform: 'rotate(50deg)'
                }}
            />
            <VideoIcon
                sx={{
                    bottom: '60%',
                    left: "57%",
                    transform: 'rotate(-35deg)'
                }}
            />
            <VideoIcon
                sx={{
                    bottom: '35%',
                    left: "52%",
                    transform: 'rotate(105deg)'
                }}
            />
        </Box>
    );
}