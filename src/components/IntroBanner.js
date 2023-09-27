import { Box, Card, CardContent, IconButton, Paper, Portal, Slide, Typography } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Close from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const appRoot = document.querySelector('#root');

export default function IntroBanner({ open, onClose }) {

    const children = (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100
            }}
        >
            <Slide in={open} mountOnEnter direction='up' unmountOnExit>
                <Paper
                    sx={{
                        backgroundColor: '#0470c7',
                        borderRadius: 0,
                        px: 1.4,
                        py: 2,
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        maxHeight: '300px',
                    }}
                >
                    <Box position='absolute' top={0} right={0}>
                        <IconButton size='small' onClick={onClose}>
                            <Close fontSize='large' />
                        </IconButton>
                    </Box>
                    <Box sx={{ backgroundColor: 'inherit', mb: 1, borderRadius: 2 }}>
                        <CardContent>
                            This is a place from where you can collect movies and
                            tv series you prefer and watch them offline by spending starting from only 250 MMK.{" "}
                            <Typography color='inherit' component={Link}  to='/how-to-use'>Need help?</Typography>
                        </CardContent>
                    </Box>
                    <Card sx={{ backgroundColor: 'inherit' }}>
                        <Box px={1.6} mt={1} display='flex' id='Card-Header'>
                            <InfoIcon />
                            <Typography>Note</Typography>
                        </Box>
                        <CardContent>
                            I haven't tested browser compatibility yet! So, make sure you run it on
                            modern web browsers, such as Google Chrome, Firefox, Brave, so that the app
                            can run properly well. Outdated browsers, such as Internet Explorer, can cause
                            visual inconsistencies and the app can be broken because that outdated browsers
                            may not support(implement) modern features.
                        </CardContent>
                    </Card>
                </Paper>
            </Slide>
        </Box>
    )

    return (
        <Portal container={appRoot} children={children} />
    );
}