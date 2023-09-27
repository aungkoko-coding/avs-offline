import React, { useMemo } from "react";
import TVShowItem from "../components/item/TVShowItem";
import TvShowItemSkeleton from "../components/skeleton/ItemSkeleton";
import GridContainer from "./util/GridContainer";
import GridItem from "./util/GridItem";

// Responsible for rendering tvShow items which will be received from hoc
export default function TVShows(props) {
  const { data: tvShowsList, itemsPerPage } = props;

  const tvShowItems = useMemo(
    () =>
      tvShowsList &&
      tvShowsList.map((tvShow, index) => (
        <GridItem key={tvShow.slug.current}>
          <TVShowItem tvShow={tvShow} />
        </GridItem>
      )),
    [tvShowsList]
  );

  const tvShowItemSkeletons = useMemo(
    () =>
      new Array(itemsPerPage).fill(undefined).map((i, index) => (
        <GridItem key={index}>
          <TvShowItemSkeleton />
        </GridItem>
      )),
    [itemsPerPage]
  );

  return <GridContainer>{tvShowItems || tvShowItemSkeletons}</GridContainer>;
}

TVShows.routeName = "tvShows";
