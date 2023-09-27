import { Box, CircularProgress, Divider, Typography, Portal } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../lib/client';
import { queryCollection, queryMovieByID, querySeasonByID } from '../lib/queries';
import Tags from '../components/nav/Tags';
import Item from '../components/item/ItemOfEachCollection';
import { AppContext } from '../context/AppContextProvider';
import AddToCartButton from '../components/util/AddToCartButton';
import DocumentHeader from '../components/util/DocumentHeader';
import Price from '../components/util/Price';
import GridContainer from '../components/util/GridContainerV2';
import GridItem from '../components/util/GridItem';
import Review from '../components/util/Review';

const appRoot = document.querySelector('#root');

export default function CollectionDetail(props) {

    const [collection, setCollection] = useState(undefined);
    const [collectionItems, setCollectionItems] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const { openNetworkError, networkError, closeNetworkError } = useContext(AppContext);
    let slug = useParams().slug;

    const { name, price, items } = collection ?? {};
    const loading = !collectionItems || !collectionItems.length > 0;

    useEffect(() => {

        if (slug) {
            // the reason why setting undefined and progress 0 is 
            // when i click collections tags while i'm already in collection details page, 
            // it doesn't show progress bar
            setCollection(undefined);
            setCollectionItems(undefined);
            setProgress(0);
            //=============
            client.fetch(queryCollection(slug))
                .then(res => {
                    if (networkError) {
                        closeNetworkError();
                    }
                    setCollection(res);
                })
                .catch(openNetworkError);
        }

    }, [slug]);

    useEffect(() => {

        (async () => {

            let colItem = [];
            if (items) {
                let promiseItems = items.map(item => {
                    if (item._type === 'movie') {
                        return client.fetch(queryMovieByID(item._ref));
                    } else {
                        return client.fetch(querySeasonByID(item._ref));
                    }
                });

                let target = promiseItems.length;

                let completed = 0;
                for await (let item of promiseItems) {
                    completed++;
                    colItem.push(item);
                    setProgress((completed / target) * 100);
                }
            }

            setCollectionItems(colItem);

        })();
    }, [items]);
    // console.log(collectionItems, 'collection');

    return (
        <Box position='relative' width='100%' p={1} px={{ xs: 0.3, sm: 3, md: 5, lg: 7 }}>
            <DocumentHeader title={`AVS | ${name || 'Collection Detail'}`} />
            <Box mt={0.5} px={0.5} display='flex' justifyContent='space-between'>
                <Box display='flex' alignItems='center' gap={1}>
                    <Typography fontSize='1.5rem'>
                        {name || 'Collection'}
                    </Typography>
                    <Price price={price} />
                </Box>

                <Box>
                    <AddToCartButton item={collection} size='small' />
                </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ width: '100%', height: 'auto' }}>
                {
                    !loading ?
                        <GridContainer>
                            {
                                collectionItems.map((item, i) => {
                                    return (
                                        <GridItem key={i}>
                                            <Item data={item} />
                                        </GridItem>
                                    )
                                })
                            }
                        </GridContainer> :
                        <Portal container={appRoot} children={<LoadingIndicator progress={progress} />} />
                }
            </Box>

            {
                collection && collection.review  && collectionItems &&
                <Review message={collection.review} mt={2} />
            }

            {
                !loading &&
                <React.Fragment>
                    <Divider sx={{ mt: 2 }} />
                    <Tags my={2} />
                </React.Fragment>
            }
        </Box>
    );
}

function LoadingIndicator({ progress }) {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            position='absolute'
            top='50%'
            left='50%'
            sx={{ transform: 'translate(-50%, -50%)' }}
        >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant={progress <= 0 ? 'indeterminate' : "determinate"} value={progress} />
                {
                    progress > 0 &&
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" component="div" color="text.secondary">
                            {`${Math.round(progress)}%`}
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
}