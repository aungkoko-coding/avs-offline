import { Grid, Pagination, PaginationItem, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MovieItem from '../components/MovieItem';

import { queryMoviesForListView, queryMoviesForListViewWithPagination } from '../lib/queries';
import { client } from '../lib/client';
import MovieItemSkeleton from '../components/ItemSkeleton';

export default function Movies(props) {

    const [moviesList, setMovies] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    // This props are not for ROUTE, they will come from App component
    let { itemsPerPage } = props;
    let [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("p")) || 1;
    // let movies = getAllMovies();

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.only('xs'));
    const sm = useMediaQuery(theme.breakpoints.only('sm'));
    const md = useMediaQuery(theme.breakpoints.only('md'));
    const lg = useMediaQuery(theme.breakpoints.only('lg'));
    const xl = useMediaQuery(theme.breakpoints.only('xl'));

    if (!itemsPerPage) {
        if (xs) {
            itemsPerPage = 12;
        } else if (sm) {
            itemsPerPage = 15;
        } else if (md) {
            itemsPerPage = 18;
        } else if (lg) {
            itemsPerPage = 24;
        } else if (xl) {
            itemsPerPage = 24;
        }
    }

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = currentPage * itemsPerPage;

    const moviesQuery = useMemo(() => queryMoviesForListView(), []);
    const moviesPaginationQuery = useMemo(() => queryMoviesForListViewWithPagination(startIndex, endIndex), [startIndex, endIndex]);

    useEffect(() => {

        if (itemsPerPage) {
            client.fetch(moviesPaginationQuery)
                .then(res => setMovies(res))
                .then(() => client.fetch(moviesQuery))
                .then(res => setTotalPages(parseInt(Math.ceil(res.length / itemsPerPage))))
                .catch(err => console.log(err));
        }

    }, [currentPage, itemsPerPage, moviesPaginationQuery, moviesQuery]);

    // console.log(moviesList, totalPages, itemsPerPage, startIndex, endIndex);

    // const totalPages1 = parseInt(Math.ceil(movies.length / itemsPerPage));

    const movieItems = moviesList && moviesList.map((movie, index) => (
        <Grid key={movie.slug.current} item xs={4} sm={4} md={3} lg={2} sx={{alignSelf: 'stretch'}} >
            <MovieItem movie={movie} />
        </Grid>

    ));

    const movieItemSkeletons = new Array(itemsPerPage).fill(undefined).map((i, index) => (
        <Grid key={index} item xs={4} sm={4} md={3} lg={2} >
            <MovieItemSkeleton />
        </Grid>
    ))

    return (
        <Stack sx={{ width: "100%", alignItems: 'center', mt: 2, px: {xs: 0, sm: 3, md: 5, lg: 7} }}>
            <Grid spacing={1} container columns={{ xs: 16, sm: 20, md: 18, lg: 16 }}>
                {movieItems || movieItemSkeletons}
            </Grid>
            {totalPages !== 1 &&
                <Pagination
                    page={currentPage}
                    variant='outlined'
                    count={totalPages || 1}
                    showFirstButton
                    showLastButton
                    sx={{ my: 1, mt: 2 }}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`?p=${item.page}`}
                            {...item}
                        />
                    )}
                />}
        </Stack>

    );
}
