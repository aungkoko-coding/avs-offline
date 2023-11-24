import React, { useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import CollectionItem from "../components/item/CollectionItem";
import CollectionItemSkeleton from "../components/skeleton/ItemSkeleton";
import GridContainer from "./util/GridContainer";

// Later, I will integrate with some window virtualization library as the movie items grow
export default function Collections(props) {
  const { data: collectionsList, itemsPerPage } = props;

  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);

  const collectionItems = useMemo(
    () =>
      collectionsList &&
      collectionsList.map((collection, index) => (
        <Grid
          key={collection.slug.current}
          item
          xs={4}
          sm={4}
          md={3}
          lg={2}
          sx={{ alignSelf: "stretch" }}
        >
          <CollectionItem data={collection} />
        </Grid>
      )),
    [collectionsList]
  );

  const collectionItemSkeletons = useMemo(
    () =>
      new Array(itemsPerPage).fill(undefined).map((i, index) => (
        <Grid key={index} item xs={4} sm={4} md={3} lg={2}>
          <CollectionItemSkeleton />
        </Grid>
      )),
    [itemsPerPage]
  );

  return (
    <GridContainer>{collectionItems || collectionItemSkeletons}</GridContainer>
  );
}

Collections.routeName = "collections";
