import React, { useMemo } from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import CollectionItem from '../components/item/CollectionItem';
import { queryCollectionsForListView, queryCollectionsForListViewWithPagination, queryMoviesForListView, queryMoviesForListViewWithPagination, } from '../lib/queries';
import CollectionItemSkeleton from '../components/skeleton/ItemSkeleton';
import withPagination from '../components/hoc/withPagination';
import Tags from '../components/nav/Tags';
import DocumentHeader from '../components/util/DocumentHeader';

// Later, I will integrate with some window virtualization library as the movie items grow
function Collections(props) {

    const { data: collectionsList, itemsPerPage } = props;

    const collectionItems = useMemo(() => (
        collectionsList && collectionsList.map((collection, index) => (
            <Grid key={collection.slug.current} item xs={4} sm={4} md={3} lg={2} sx={{ alignSelf: 'stretch' }} >
                <CollectionItem data={collection} />
            </Grid>
        ))
    ), [collectionsList]);

    const collectionItemSkeletons = useMemo(() => (
        new Array(itemsPerPage).fill(undefined).map((i, index) => (
            <Grid key={index} item xs={4} sm={4} md={3} lg={2} >
                <CollectionItemSkeleton />
            </Grid>
        ))
    ), [itemsPerPage]);

    return (
        <Stack sx={{ width: "100%", alignItems: 'center', mb: 2, px: { xs: 0.3, sm: 3, md: 5, lg: 7 } }}>
            <Box width="100%" mb={1.3}>
                <Divider>
                    <Typography fontSize='1.2rem'>
                        Collections
                    </Typography>
                </Divider>
            </Box>
            <Grid spacing={{ xs: 0.5, sm: 1 }} container columns={{ xs: 16, sm: 20, md: 18, lg: 16 }}>
                {collectionItems || collectionItemSkeletons}
            </Grid>
        </Stack>
    );
}

Collections.routeName = 'collections';

const CollectionsWithPagination = withPagination(Collections, queryCollectionsForListView, queryCollectionsForListViewWithPagination, true);

export default function CollectionsRoute() {
    return (
        <React.Fragment>
            <DocumentHeader title='AVS | Collections' />
            <CollectionsWithPagination />
            <Box position='relative' width='100%' p={1} px={{ xs: 0.3, sm: 3, md: 5, lg: 7 }}>
                <Divider mt={2} />
                <Tags my={2} />
            </Box>
        </React.Fragment>
    )
}