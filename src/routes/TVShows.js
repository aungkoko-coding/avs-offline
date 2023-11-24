import { Divider, Box, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import TVShowItem from "../components/item/TVShowItem";
import {
  querySeasonsForListView,
  querySeasonsForListViewWithPagination,
} from "../lib/queries";
import TvShowItemSkeleton from "../components/skeleton/ItemSkeleton";
import withPagination from "../components/hoc/withPagination";
import Tags from "../components/nav/Tags";
import DocumentHeader from "../components/util/DocumentHeader";
import GridContainer from "../components/util/GridContainerV2";
import GridItem from "../components/util/GridItem";

// Later, I will integrate with some window virtualization library as the tv-show items grow
function TVShows(props) {
  const { data: tvShowsList, itemsPerPage } = props;
  //console.log(tvShowsList);

  const tvShowItems = useMemo(
    () =>
      tvShowsList &&
      tvShowsList.map((tvShow, i) => (
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
          <Typography fontSize="1.2rem">TV Series</Typography>
        </Divider>
      </Box>
      <GridContainer>{tvShowItems || tvShowItemSkeletons}</GridContainer>
    </Stack>
  );
}

TVShows.routeName = "tvShows";

const TVShowsWithPagination = withPagination(
  TVShows,
  querySeasonsForListView,
  querySeasonsForListViewWithPagination,
  true
);

export default function TVShowsRoute() {
  return (
    <React.Fragment>
      <DocumentHeader title="AVS | TV Series" />
      <TVShowsWithPagination />
      <Box position="relative" width="100%" py={1}>
        <Divider mt={2} />
        <Tags my={2} />
      </Box>
    </React.Fragment>
  );
}
