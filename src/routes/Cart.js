import SelectAllIcon from '@mui/icons-material/DoneAll';
import SelectIcon from '@mui/icons-material/Done';
import DeselectAllIcon from '@mui/icons-material/RemoveDone';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, CircularProgress, styled, ToggleButton, Tooltip, CardMedia, Divider, IconButton, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Item from '../components/item/CartItem';
import DocumentHeader from '../components/util/DocumentHeader';
import { AppContext } from '../context/AppContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import Tags from '../components/nav/Tags';
import { calculatePrice } from '../api/Util';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const StyledSpan = styled("span")(({ theme }) => ({
    color: theme.palette.text.primary
}));

export default function Cart(props) {

    const [selectMode, setSelectMode] = useState(false);
    const [selectAllMode, setSelectAllMode] = useState(false);
    const [totalPrice, setTotalPrice] = useState(undefined);
    const { cartItems, removeFromCart, promotion } = useContext(AppContext);
    const [selectedItems, setSelectedItems] = useState({});

    const toggleSelectAllMode = () => {
        setSelectAllMode(prev => !prev);
        setSelectMode(true);
    }

    const handleSelect = (slug) => {
        setSelectedItems(prevSelectedItems => ({ ...prevSelectedItems, [slug]: !prevSelectedItems[slug] }));
    }

    const handleDelete = () => {
        Object.entries(selectedItems).filter(([key, value]) => value).forEach(([key, value]) => {
            const deleteItem = cartItems.find(card => card.slug.current === key);
            if (deleteItem) {
                removeFromCart(deleteItem);
            }
        });
        setSelectedItems({});
        setSelectMode(false);
    }

    useEffect(() => {
        const selectedItems = {};
        if (selectAllMode) {
            cartItems.map(item => item.slug.current).forEach(slug => {
                selectedItems[slug] = true;
            });
        }
        setSelectedItems(selectedItems);

    }, [selectAllMode]);

    useEffect(() => {
        if (cartItems) {
            let prices = cartItems.map(item => item.price);
            let totalPrice = 0;
            prices.forEach(price => totalPrice += parseFloat(price));
            setTotalPrice(totalPrice);
        }
    }, [cartItems]);

    const selectedItemsLength = Object.entries(selectedItems).filter(([key, value]) => value).length;

    return (
        <Box position='relative' width='100%' p={1} px={{ xs: 0.3, sm: 3, md: 5, lg: 7 }}>
            <DocumentHeader title='AVS | Your Cart' />
            <Box mt={0.5} px={0.5} display='flex' justifyContent='space-between' alignItems='center'>
                <Typography fontSize='1.5rem'>
                    {
                        selectMode ?
                            `${selectedItemsLength} ${selectedItemsLength > 1 ? 'items' : 'item'} selected` : 'Your Cart'
                    }
                </Typography>
                <Box>
                    <Tooltip title='Select'>
                        <ToggleButton value='Select' selected={selectMode} onClick={() => setSelectMode(prevMode => !prevMode)}>
                            <SelectIcon />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title={selectAllMode ? 'Deselect all' : 'Select all'}>
                        <IconButton onClick={toggleSelectAllMode}>
                            {
                                selectAllMode ? <DeselectAllIcon /> : <SelectAllIcon />
                            }
                        </IconButton>
                    </Tooltip>
                    <IconButton disabled={!selectMode || selectedItemsLength < 1} onClick={handleDelete} color='error'>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ width: '100%', height: 'auto' }}>
                {
                    cartItems.length > 0 ?
                        <Grid spacing={{ xs: 0.5, sm: 1 }} container columns={{ xs: 16, sm: 20, md: 18, lg: 16 }}>
                            {
                                cartItems.map((item, i) => {
                                    return (
                                        <Grid key={i} item xs={4} sm={4} md={3} lg={2} sx={{ alignSelf: 'stretch' }} >
                                            <Item
                                                data={item}
                                                promotion={promotion}
                                                selected={!!selectedItems[item.slug.current]}
                                                isSelectModeOn={selectMode}
                                                onSelect={() => handleSelect(item.slug.current)}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid> :
                        <EmptyCart />
                }
            </Box>

            <Divider sx={{ mt: 2 }} />
            <Box my={2} display='flex' justifyContent='space-between' alignItems='center'>
                <StyledTypography variant="subtitle1" sx={{ mt: 1 }}>
                    Total items : <StyledSpan> {cartItems.length}</StyledSpan>
                </StyledTypography>
                <StyledTypography variant="subtitle1" sx={{ mt: 1 }}>
                    Total Price : <StyledSpan> {promotion ? calculatePrice(promotion, totalPrice) : totalPrice} MMK </StyledSpan>
                </StyledTypography>
            </Box>

            <React.Fragment>
                <Divider sx={{ mt: 2 }} />
                <Tags my={2} />
            </React.Fragment>
        </Box>
    );
}

function EmptyCart() {
    return (
        <Grid container direction='column' alignItems='center' sx={{ mt: 2 }}>
            <Grid item xs={4} container justifyContent='center'>
                <Box>
                    <CardMedia
                        component='img'
                        src='/assets/empty_cart1.png'
                        alt='Cart is empty!'
                        sx={{ maxWidth: { xs: '100%', sm: 500 } }}
                    />
                </Box>

            </Grid>

            <Typography variant='h5'>
                Your cart is empty!
            </Typography>

        </Grid>
    );
}