import React, { useContext } from "react";
import { List, ListItem, Alert, ListItemText, Switch, Typography, FormLabel, Select, MenuItem, styled, FormGroup } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppContext } from "../context/AppContextProvider";
import { searchByGenre, searchByTitle, searchForBoth, searchForMovies, searchForTvShows } from "../api/Util";

const StyledSwitch = styled((props) => (
    <Switch size="small" {...props} />
))({top: '-10%', transform: 'translateY(-35%)'});

export default function SearchSettings(props) {

    const { strictMode, multipleSearchMode, searchBy, searchFor,
        toggleStrictMode, toggleMultipleSearchMode, changeSearchBy,
        changeSearchFor } = useContext(AppContext);
        
    return (
        <FormGroup sx={{mt: 2}} variant="standard" component="fieldset">
            <FormLabel component="legend" sx={{
                backgroundColor: 'inherit',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                columnGap: "5px",
                pl: 1.6,
                color: (theme) => theme.palette.text.primary
            }}>    
                <SettingsIcon color="primary" fontSize='small' /> <Typography variant='subtitle1'>Customize your search</Typography>
            </FormLabel>
            
            <List>
                <ListItem component="label" secondaryAction={<StyledSwitch checked={multipleSearchMode} onChange={toggleMultipleSearchMode}  />}>
                    <ListItemText 
                        primary="Multiple search" 
                        secondary="Enable to allow search input to take multiple values"
                    />
                </ListItem>
                <ListItem component="label" secondaryAction={<StyledSwitch checked={strictMode} onChange={toggleStrictMode}  />}>
                    <ListItemText 
                        primary="Strict search" 
                        secondary="Enable to strictly search"
                    />
                </ListItem>
                <ListItem secondaryAction={
                    <Select 
                        variant="outlined" 
                        value={searchFor} 
                        size="small"
                        onChange={changeSearchFor}
                    >
                        <MenuItem value={searchForMovies}>movies</MenuItem>
                        <MenuItem value={searchForTvShows}>tv series</MenuItem>
                        <MenuItem value={searchForBoth}>both</MenuItem>
                    </Select>
                }>
                    <ListItemText
                        primary="Search for"
                        secondary="Choose what to search for"
                    />
                </ListItem>
                <ListItem secondaryAction={
                    <Select 
                        variant="outlined" 
                        value={searchBy} 
                        size="small"
                        onChange={changeSearchBy}
                    >
                        <MenuItem value={searchByTitle}>{ searchByTitle }</MenuItem>
                        <MenuItem value={searchByGenre}>{ searchByGenre }</MenuItem>
                    </Select>
                }>
                    <ListItemText
                        primary="Search by"
                        secondary="Choose what to search by"
                    />
                </ListItem>
            </List>

            <Alert 
                severity="warning" 
                children="You should remember settings you've made up when you search!" 
                sx={{
                    padding: {xs: 0.5, md: '14px !important'},
                    '& .MuiAlert-message': {
                        maxWidth: {xs: 'auto', md: '300px'}
                    }
                }} 
            />
        </FormGroup>

    )
}