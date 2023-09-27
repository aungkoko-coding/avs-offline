import { Chip, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { calculatePrice } from '../../api/Util';
import { AppContext } from '../../context/AppContextProvider';

export default function Price({ price }) {

    const { promotion } = useContext(AppContext);

    return (
        <Chip 
            label={
                promotion ? 
                (
                    <Typography fontSize='inherit'>
                        <span style={{textDecoration: 'line-through'}}>{price}</span> {" "}
                        {calculatePrice(promotion, price) || 0} MMK
                    </Typography>
                ) : 
                `${price || 0} MMK`
            } 
            variant="outlined" 
            size="small" 
            color="warning" 
        />
    )
}