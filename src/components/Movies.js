import React, { useMemo } from "react";
import MovieItem from "../components/item/MovieItem";
import MovieItemSkeleton from "../components/skeleton/ItemSkeleton";
import GridContainer from "./util/GridContainer";
import GridItem from "./util/GridItem";

// Responsible for rendering movie items which will be received from hoc
export default function Movies(props) {
  const { data: moviesList, itemsPerPage } = props;

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

  return <GridContainer>{movieItems || movieItemSkeletons}</GridContainer>;
}

Movies.routeName = "movies";
