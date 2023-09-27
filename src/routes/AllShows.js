import MovieIcon from '@mui/icons-material/MovieOutlined';
import TVShowIcon from '@mui/icons-material/Tv';
import { Box, Button, Divider, Paper, styled, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useRef } from 'react';
import Movies from '../components/Movies';
import TVShows from '../components/TVShows';
import Collections from '../components/Collections';
import CollectionsIcon from '@mui/icons-material/CollectionsOutlined';
import withPagination from '../components/hoc/withPagination';
import { queryCollectionsForListView, queryCollectionsForListViewWithPagination, queryMoviesForListView, queryMoviesForListViewWithPagination, querySeasonsForListView, querySeasonsForListViewWithPagination } from '../lib/queries';
import { Link } from 'react-router-dom';
import Tags from '../components/nav/Tags';
import DocumentHeader from '../components/util/DocumentHeader';
import Banner from '../components/Banner';
import Popular from '../components/Popular';
import CreditCM from '../components/util/CreditCM';
import PeopleOutlineSharp from '@mui/icons-material/Public';

const LinkButton = styled((props) => (
    <Button
        LinkComponent={Link}
        to={props.to}
        variant='contained'
        size={props.belowSm ? 'small' : 'medium'}
        sx={{textTransform: 'none'}}
    >
        View All
    </Button>
))({});

const MoviesWithPagination = withPagination(Movies, queryMoviesForListView, queryMoviesForListViewWithPagination);
const TVShowsWithPagination = withPagination(TVShows, querySeasonsForListView, querySeasonsForListViewWithPagination);
const CollectionsWithPagination = withPagination(Collections, queryCollectionsForListView, queryCollectionsForListViewWithPagination);

export default function AllShows(props) {

    const theme = useTheme();
    const belowSm = useMediaQuery(theme.breakpoints.down('sm'));
    const containerRefForNavButton = useRef();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{ mt: 1, p: 1 }}
        >
            <DocumentHeader title='AVS' />
            <Paper elevation={0} sx={{px: { xs: 0, sm: 3, md: 5, lg: 7 }, mb: 2}}>
                <Banner />
            </Paper>

            <Box
                ref={containerRefForNavButton}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mx={{ xs: 0, sm: 2, md: 4, lg: 6 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleOutlineSharp fontSize={belowSm ? 'medium' : 'large'} sx={{ color: '#ff4081' }} />
                    <Typography fontSize={belowSm ? '1rem' : '1.3rem'}>Popular</Typography>
                </Box>
            </Box>
            <Paper elevation={0} sx={{mt: 2}}>
                <Popular containerForNavButton={containerRefForNavButton} />
            </Paper>
            
            <Divider sx={{ mt: 2, mx: { xs: 0, sm: 2, md: 4, lg: 6 } }} />

            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mx={{ xs: 0, sm: 2, md: 4, lg: 6 }}
                mt={2}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MovieIcon fontSize={belowSm ? 'medium' : 'large'} sx={{ color: '#ff4081' }} />
                    <Typography fontSize={belowSm ? '1rem' : '1.3rem'}>Movies</Typography>
                </Box>
                <LinkButton to='movies' belowSm={belowSm} />
            </Box>

            <Paper elevation={0}>
                <MoviesWithPagination />
            </Paper>

            <Divider sx={{ mt: 2, mx: { xs: 0, sm: 2, md: 4, lg: 6 } }} />

            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mx={{ xs: 0, sm: 2, md: 4, lg: 6 }}
                mt={2}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TVShowIcon fontSize={belowSm ? 'medium' : 'large'} sx={{ color: '#ff4081' }} />
                    <Typography fontSize={belowSm ? '1rem' : '1.3rem'}>TV Series</Typography>
                </Box>
                <LinkButton to='tv-shows' belowSm={belowSm} />
            </Box>
            <Paper elevation={0}>
                <TVShowsWithPagination />
            </Paper>

            <Divider sx={{ mt: 2, mx: { xs: 0, sm: 2, md: 4, lg: 6 } }} />

            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mx={{ xs: 0, sm: 2, md: 4, lg: 6 }}
                mt={2}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CollectionsIcon fontSize={belowSm ? 'medium' : 'large'} sx={{ color: '#ff4081' }} />
                    <Typography fontSize={belowSm ? '1rem' : '1.3rem'}>Collections</Typography>
                </Box>
                <LinkButton to='collections' belowSm={belowSm} />
            </Box>
            <Paper elevation={0}>
                <CollectionsWithPagination />
            </Paper>

            <CreditCM />

            <Divider sx={{ mt: 2, mx: { xs: 0, sm: 2, md: 4, lg: 6 } }} />
            <Tags mx={{ xs: 0, sm: 2, md: 4, lg: 6 }} my={2} />
        </Box>
    )
}