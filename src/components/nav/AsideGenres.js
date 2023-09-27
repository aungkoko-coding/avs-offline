import React, { useContext, useEffect, useState } from 'react';
import { Paper, List, ListItem, ListItemButton, ListItemText, Typography, Box, CircularProgress } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContextProvider';

const Badge = styled("p")({
    border: 'solid 0.1px #ff4081',
    borderRadius: "5px",
    padding: "2px 6px",
    fontSize: '0.7rem',
});

export default function AsideGenres(props) {

    const { genreValues } = useContext(AppContext);

    const navigate = useNavigate();

    return (
        <Paper
            component="aside"
            sx={{
                position: 'relative',
                width: { sm: '170px' },
                height: { xs: '235px', sm: '335px' },
                overflowY: 'auto',
                border: (theme) => `solid 1px ${alpha(theme.palette.primary.main, 0.2)}`
            }}
        >
            {
                genreValues ?
                    <List sx={{ py: 0 }}>
                        {
                            genreValues &&
                            Object.entries(genreValues)?.map(([genre, value]) => (
                                <ListItem
                                    key={genre}
                                    disablePadding
                                    divider
                                >
                                    <ListItemButton
                                        onClick={() => navigate(`/search?genre=${genre}`)}
                                    >
                                        <ListItemText sx={{
                                            "& .MuiTypography-root": {
                                                fontSize: "1rem"
                                            }
                                        }}>
                                            {genre}
                                        </ListItemText>
                                        <Badge>
                                            <Typography variant="caption" fontSize='inherit'>
                                                {value}
                                            </Typography>
                                        </Badge>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List> 
                    :
                    <Box
                        position='absolute'
                        top='50%'
                        left='50%'
                        sx={{transform: 'translate(-50%, -50%)'}}
                    >
                        <CircularProgress />
                    </Box>
            }
        </Paper>
    )
}