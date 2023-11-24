import React, { useMemo } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import MovieItem from "../components/item/MovieItem";
import {
  queryMoviesForListView,
  queryMoviesForListViewWithPagination,
} from "../lib/queries";
import MovieItemSkeleton from "../components/skeleton/ItemSkeleton";
import withPagination from "../components/hoc/withPagination";
import Tags from "../components/nav/Tags";
import DocumentHeader from "../components/util/DocumentHeader";
import GridContainer from "../components/util/GridContainerV2";
import GridItem from "../components/util/GridItem";

// Later, I will integrate with some window virtualization library as the movie items grow
function Movies(props) {
  const { data: moviesList, itemsPerPage } = props;
  //console.log(moviesList);

  const movieItems = useMemo(
    () =>
      moviesList &&
      moviesList.map((movie) => (
        <GridItem key={movie.slug.current}>
          <MovieItem movie={movie} />
        </GridItem>
      )),
    [moviesList]
  );

  const movieItemSkeletons = useMemo(
    () =>
      new Array(itemsPerPage).fill(undefined).map((i, index) => (
        <GridItem key={index}>
          <MovieItemSkeleton />
        </GridItem>
      )),
    [itemsPerPage]
  );

  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box width="100%" mb={1.3}>
        <Divider>
          <Typography fontSize="1.2rem">Movies</Typography>
        </Divider>
      </Box>
      <GridContainer>{movieItems || movieItemSkeletons}</GridContainer>
    </Stack>
  );
}

Movies.routeName = "movies";

const MoviesWithPagination = withPagination(
  Movies,
  queryMoviesForListView,
  queryMoviesForListViewWithPagination,
  true
);

export default function MoviesRoute() {
  return (
    <React.Fragment>
      <DocumentHeader title="AVS | Movies" />
      <MoviesWithPagination />
      <Box position="relative" width="100%" py={1}>
        <Divider mt={2} />
        <Tags my={2} />
      </Box>
    </React.Fragment>
  );
}
