import React, { useContext } from 'react';
import { alpha, Box, Chip, styled, Typography } from '@mui/material';
import { AppContext } from '../../context/AppContextProvider';
import { Link } from 'react-router-dom';

const StyledChip = styled(Chip)(( { theme } ) => ({
    backgroundColor: alpha('#ff4081', 0.8),
    transition: theme.transitions.create('all'),
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark
    }
}));

export default function Tags(props) {

    const { tags, openSearchingIndicator } = useContext(AppContext);

    return (
        <Box display='flex' flexDirection='column' alignItems='flex-start' {...props}>
            <Typography
                variant='h5'
                sx={{
                    pl: 1,
                    borderLeft: 'solid 8px #f60606',
                    display: 'inline-block'
                }}
            >
                Tags
            </Typography>
            <Box 
                mt={1.2}
                display='flex'
                flexWrap='wrap'
                gap='3.2px'
            >
                {
                    tags &&
                    tags.map(tag => (
                        <StyledChip 
                            key={tag.value} 
                            label={tag.value}
                            component={Link}
                            to={tag.type === 'collection' ? `/collections/${tag.slug}` : `/search?genre=${tag.value}`}
                            onClick={openSearchingIndicator}
                            sx={{
                                fontSize: {xs: '0.7rem', sm: '0.845rem'}
                            }}
                        />
                    ))
                }
            </Box>

        </Box>
    );
}