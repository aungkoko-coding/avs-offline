import React, { useContext, useState } from 'react';
import { Drawer, IconButton, Collapse, Divider, List, ListItem as MuiListItem, ListItemButton, ListItemText as MuiListItemText, ListItemIcon, ListSubheader, Typography } from '@mui/material';
import { alpha, styled, } from '@mui/material/styles';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import AllIcon from '@mui/icons-material/AppsOutlined';
import CollectionsIcon from '@mui/icons-material/CollectionsOutlined';
import { AppContext } from '../../context/AppContextProvider';

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  color: theme.palette.text.primary
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const DrawerBody = styled('div')({
  overflowY: 'auto'
})

const StyledListItemIcon = styled(ListItemIcon)({ minWidth: 'unset', marginRight: '8px' });

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton disableRipple {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(-90deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NavDrawer({ width, open, onClose, toggleDrawer, toggleSearchSettings }) {

  const [expand, setExpand] = useState(false);

  const { genres, genreValues, openSearchingIndicator } = useContext(AppContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const genreParam = searchParams.getAll('genre');

  const toggleExpand = () => setExpand(expand => !expand);

  const ListItem = styled((props => (
    <MuiListItem onClick={toggleDrawer} {...props} />
  )))({});

  return (
    <Drawer /** Drawer for genres(mobile view) */
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
        }
      }}
    >
      <DrawerHeader>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <DrawerBody>
        <List>
          <ListItem disablePadding component={Link} to='/' >
            <ListItemButton selected={location.pathname === '/'}>
              <StyledListItemIcon>
                <AllIcon sx={{ color: '#ff4081' }} />
              </StyledListItemIcon>
              <ListItemText>
                All
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to='/movies' >
            <ListItemButton selected={location.pathname === '/movies'}>
              <StyledListItemIcon>
                <MovieIcon sx={{ color: '#ff4081' }} />
              </StyledListItemIcon>
              <ListItemText>
                Movies
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to='/tv-shows'>
            <ListItemButton selected={location.pathname === '/tv-shows'}>
              <StyledListItemIcon>
                <TvIcon sx={{ color: '#ff4081' }} />
              </StyledListItemIcon>
              <ListItemText>
                TV Series
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to='/collections' >
            <ListItemButton selected={location.pathname === '/collections'}>
              <StyledListItemIcon>
                <CollectionsIcon sx={{ color: '#ff4081' }} />
              </StyledListItemIcon>
              <ListItemText>
                Collections
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={toggleExpand}>
            <ListItemButton>
              <ListItemText>
                Genres
              </ListItemText>
              <ExpandMore expand={expand}>
                <ExpandMoreIcon fontSize='small' />
              </ExpandMore>
            </ListItemButton>
          </ListItem>
          <Collapse in={expand}>
            {
              ((genreValues && Object.getOwnPropertyNames(genreValues)) || genres).map((genre, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  component={Link}
                  to={`/search?genre=${genre}`}
                  onClick={() => {openSearchingIndicator(); toggleDrawer();}}
                >
                  <ListItemButton selected={genreParam && genreParam.length === 1 && genreParam[0] === genre}>
                    <ListItemText inset sx={{ pl: 2 }}>
                      {genre}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))
            }
            {
              !genreValues &&
              <ListItem
                disablePadding
              >
                <ListItemButton disabled>
                  <ListItemText inset sx={{ pl: 2 }}>
                    Loading more...
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            }
          </Collapse>

          <MuiListItem disablePadding>
            <ListItemButton onClick={toggleSearchSettings}>
              <StyledListItemIcon>
                <SettingsIcon sx={{ color: '#ff4081' }} />
              </StyledListItemIcon>
              <ListItemText>
                Settings
              </ListItemText>
            </ListItemButton>
          </MuiListItem>

          <Divider sx={{ backgroundColor: alpha('#ff4081', 0.1) }} />
          <List>
            <ListSubheader
              sx={{
                backgroundColor: 'unset',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ mr: 0.5 }}>Developer</Typography>
              <EditIcon fontSize='small' />
            </ListSubheader>
            <MuiListItem>
              <ListItemText>
                Aung Ko Ko
              </ListItemText>
            </MuiListItem>
          </List>
        </List>
      </DrawerBody>

    </Drawer>
  )
}