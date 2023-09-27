import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/AddShoppingCart';
import { AppContext } from '../../context/AppContextProvider';
import { checkItemInList } from '../../api/Util';
import DeleteIcon from '@mui/icons-material/RemoveShoppingCart';

export default function AddToCartButton({item, size}) {
     
    const [isItemInCart, setIsItemInCart] = useState(false);
    const { addToCart, removeFromCart, cartItems } = useContext(AppContext);

    useEffect(() => {
        if(item) {
            checkItemInList(cartItems, item).then(isItemInCart => setIsItemInCart(isItemInCart));
        }
    }, [cartItems, item]);


    return (
        <Button
            variant='outlined'
            color={isItemInCart ? 'error' : 'primary'}
            startIcon={isItemInCart ? <DeleteIcon /> : <AddIcon />}
            onClick={() => isItemInCart ? removeFromCart(item) : addToCart(item)}
            disabled={!item}
            sx={{textTransform: 'none'}}
            size={size || 'medium'}
        >
            {
                isItemInCart ? 'Remove' : 'Add to Cart'
            }
        </Button>
    )
}