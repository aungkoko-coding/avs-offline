import React from 'react';
import { Typography, Box, Link} from '@mui/material';

export default function CreditCM() {
    return (
        <Typography variant='subtitle2' sx={{ textAlign: 'center', mt: 4 }}>
            Most videos were downloaded from {" "}
            <Link href='https://www.channelmyanmar.org' target="_blank">
                <Box sx={{ display: 'inline-block', width: 90, height: 25 }}>
                    <img src='/channelmyanmar.jpg' alt="Channel Myanmar" style={{ width: "100%", height: "100%" }} />
                </Box>
            </Link>
        </Typography>
    )
}