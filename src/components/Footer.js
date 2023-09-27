import { alpha, Box, Link, Paper, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import React from 'react';

export default function Footer(props) {
    return (
        <Paper
            elevation={1}
            sx={{
                height: 90,
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                padding: '8px',
                gap: '5px'
            }}
        >
            <Box>
                <Typography variant='body2' component="p" sx={{
                    color: (theme) => alpha(theme.palette.text.primary, 0.6),
                    fontSize: '0.6rem'
                }}>
                    Copyright &copy;2023 Aung Ko Ko. All rights reserved!
                </Typography>
            </Box>
            <Box sx={{
                "& > *:not(:last-child)": {
                    marginRight: "5px"
                }
            }}>
                <Link href='mailto: aungkokowebdev@gmail.com' target='_blank'>
                    <EmailIcon />
                </Link>
                <Link href='https://github.com/AKK-soft-dev' target='_blank'>
                    <GitHubIcon />
                </Link>
                <Link href='https://www.facebook.com/profile.php?id=100089639319649' target='_blank'>
                    <FacebookIcon />
                </Link>
                <InstagramIcon />
                <TwitterIcon />
                <Link href='https://t.me/Aung_Ko_Ko_WebDev' target='_blank'>
                    <TelegramIcon />
                </Link>
            </Box>
        </Paper>
    )
}