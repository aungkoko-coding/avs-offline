import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { AppContext } from '../../context/AppContextProvider';

export default function NetworkTimeout() {

    const { networkError } = useContext(AppContext);

    return (
        <React.Fragment>
            {
                networkError &&
                <Box>
                    <Typography sx={{color: (theme) => theme.palette.error.main}}>
                        Network Error! Check your internet connection or refresh the page!
                    </Typography>
                </Box>
            }
        </React.Fragment>
    )
}