import React, { useContext, useEffect, useRef, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Link as MuiLink,
  Badge,
  Box,
  Button,
  CssBaseline,
  IconButton,
  MenuItem,
  responsiveFontSizes,
  Toolbar,
  Typography,
  alpha,
  ButtonGroup,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  Grow,
  Grid,
  Tooltip,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/MovieOutlined";
import Footer from "./components/Footer";
import SearchSettingsDialog from "./components/SearchSettingsDialog";
import NetworkError from "./components/error/NetworkError";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CollectionsIcon from "@mui/icons-material/CollectionsOutlined";
import HelpCenterIcon from "@mui/icons-material/HelpCenterOutlined";
import TvIcon from "@mui/icons-material/Tv";
import { AppContext } from "./context/AppContextProvider";
import BrandName from "./components/BrandName";
import SearchInputBox from "./components/SearchInputBox";
import MobileNavDrawer from "./components/nav/MobileNavDrawer";
import { client } from "./lib/client";
import {
  queryAllCollections,
  queryAllMovies,
  queryAllSeasons,
  queryPromotion,
} from "./lib/queries";
import IntroBanner from "./components/IntroBanner";
import SearchOffIcon from "@mui/icons-material/SearchOffOutlined";

function App(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchSettingsDialogOpen, setSearchSettingsDialogOpen] =
    useState(false);
  const [visited, setVisited] = useState(
    localStorage.getItem("visited") || false
  );
  const forGenresMenuRef = useRef(null);
  const forSearchInputBoxRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartItems,
    promotion,
    setPromotion,
    genreValues,
    genres,
    tags,
    setTags,
    setGenreValues,
    networkError,
    openNetworkError,
    closeNetworkError,
    openSearchingIndicator,
    searchInputBoxOpen,
    setSearchInputBoxOpen,
  } = useContext(AppContext);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const responsiveTheme = responsiveFontSizes(theme);
  const pages = ["Movies", "TV-Series"];
  const drawerWidth = 180;

  useEffect(() => {
    if (!visited) {
      localStorage.setItem("recentUrl", location.pathname + location.search);
    }
  }, [visited]);

  useEffect(() => {
    window.ononline = () => closeNetworkError();
  }, []);

  useEffect(() => {
    if (!promotion) {
      client
        .fetch(queryPromotion())
        .then((res) => {
          setPromotion(res);
        })
        .catch(openNetworkError);
    }
  });

  // add genres and tags
  useEffect(() => {
    if (!genreValues || !tags) {
      let genreValues = {};
      let tags = [];
      client
        .fetch(queryAllMovies())
        .then((movies) => {
          movies?.forEach((movie) => {
            movie.genres?.forEach((genre) => {
              genreValues[genre] = (genreValues[genre] || 0) + 1;
            });
          });
        })
        .then(() => client.fetch(queryAllSeasons()))
        .then((tvShows) => {
          tvShows?.forEach((tvShow) => {
            tvShow.genres?.forEach((genre) => {
              genreValues[genre] = (genreValues[genre] || 0) + 1;
            });
          });
        })
        .then(() => client.fetch(queryAllCollections()))
        .then((collections) => {
          let cols = collections?.map((collection) => ({
            type: "collection",
            value: collection.name,
            slug: collection.slug.current,
          }));
          let genres = Object.getOwnPropertyNames(genreValues).map((genre) => ({
            type: "genre",
            value: genre,
          }));
          tags = tags.concat(cols, genres);
        })
        .then(() => {
          setTags(tags);
          setGenreValues(genreValues);
        })
        .catch(openNetworkError);
    }
  }, [genreValues, tags, networkError]);

  function handleGenresMenuClose(event) {
    if (
      forGenresMenuRef.current &&
      forGenresMenuRef.current.contains(event.target)
    ) {
      return;
    }
    setOpenMenu(false);
  }

  function toggleDrawer() {
    setDrawerOpen((open) => !open);
  }

  function toggleSearchSettingsDialog() {
    setSearchSettingsDialogOpen((open) => !open);
  }

  function toggleSearchInputBox() {
    setSearchInputBoxOpen((prev) => !prev);
  }

  function openSearchInputBox() {
    setSearchInputBoxOpen(true);
  }

  function closeSearchInputBox(event) {
    if (
      event &&
      event.target &&
      forSearchInputBoxRef.current &&
      forSearchInputBoxRef.current.contains(event.target)
    ) {
      return;
    }
    setSearchInputBoxOpen(false);
  }

  function handleSearchByGenre(genre) {
    openSearchingIndicator();
    navigate(`/search?genre=${genre}`);
  }

  const StyledButtonWithArrow = styled(Button)(({ theme, open }) => ({
    transform: !open ? "rotate(0deg)" : "rotate(180deg)",
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  }));

  return (
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline enableColorScheme />
      <IntroBanner
        open={!visited}
        onClose={() => {
          localStorage.setItem("visited", true);
          setVisited(true);
        }}
      />
      <AppBar position="fixed">
        <Toolbar component={Container}>
          {/** Brand name, not for mobile view */}
          <Grid
            container
            flexGrow={1}
            width="unset"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <BrandName responsiveMode mdScreen />
          </Grid>
          {/** Navigation link, not for mobile view */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: visited ? "flex" : "none" },
              alignItems: "center",
              "& > *:not(last-child)": {
                mr: 1,
              },
            }}
          >
            {pages.map((page, index) => (
              <MuiLink
                key={index}
                component={Link}
                to={page === "TV-Series" ? "tv-shows" : page.toLowerCase()}
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    color: alpha("#90caf9", 0.8),
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {page === "Movies" ? (
                    <MovieIcon sx={{ color: "#ff4081" }} />
                  ) : (
                    <TvIcon sx={{ color: "#ff4081" }} />
                  )}
                  {page}
                </Box>
              </MuiLink>
            ))}
            <MuiLink
              component={Link}
              to="/collections"
              sx={{
                textDecoration: "none",
                "&:hover": {
                  color: alpha("#90caf9", 0.8),
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CollectionsIcon sx={{ color: "#ff4081" }} />
                Collections
              </Box>
            </MuiLink>
            <Box>
              <ButtonGroup ref={forGenresMenuRef}>
                <Button
                  onClick={() => setOpenMenu((open) => !open)}
                  disableRipple
                  sx={{
                    textTransform: "none",
                    fontSize: "1rem",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.common.black, 0.15),
                  }}
                >
                  Genres
                </Button>
                <StyledButtonWithArrow
                  size="small"
                  sx={{
                    position: "relative",
                    textTransform: "none",
                    fontSize: "1rem",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.common.black, 0.15),
                  }}
                  onClick={() => setOpenMenu((open) => !open)}
                  open={openMenu}
                >
                  <ArrowDropDownIcon sx={{ color: "#ff4081" }} />
                </StyledButtonWithArrow>
              </ButtonGroup>
            </Box>
            <Popper /** Menu for genres */
              sx={{ zIndex: 1 }}
              open={openMenu}
              anchorEl={forGenresMenuRef.current}
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper sx={{ maxHeight: "320px", overflowY: "auto" }}>
                    <ClickAwayListener onClickAway={handleGenresMenuClose}>
                      <MenuList autoFocusItem>
                        {(
                          (genreValues &&
                            Object.getOwnPropertyNames(genreValues)) ||
                          genres
                        ).map((genre, index) => (
                          <MenuItem
                            key={index}
                            onClick={(e) => {
                              handleGenresMenuClose(e);
                              handleSearchByGenre(genre);
                            }}
                          >
                            <SearchIcon fontSize="small" />
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>
                              {genre}
                            </Typography>
                          </MenuItem>
                        ))}
                        {!genreValues && (
                          <MenuItem disabled>
                            <Typography variant="subtitle1">
                              Loading more...
                            </Typography>
                          </MenuItem>
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>{" "}
          {/** End navigation link */}
          {/** For mobile view */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon fontSize="medium" />
            </IconButton>
            <Grid container flexGrow={1} sx={{ justifyContent: "center" }}>
              <BrandName responsiveMode />
            </Grid>
            <Box />
          </Box>
          <MobileNavDrawer
            width={drawerWidth}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            toggleDrawer={toggleDrawer}
            toggleSearchSettings={toggleSearchSettingsDialog}
          />
          <Box>
            <Tooltip title="Search">
              <IconButton
                onClick={toggleSearchInputBox}
                ref={forSearchInputBoxRef}
              >
                {searchInputBoxOpen ? <SearchOffIcon /> : <SearchIcon />}
              </IconButton>
            </Tooltip>

            <SearchInputBox
              open={searchInputBoxOpen}
              onClose={closeSearchInputBox}
              anchorEl={forSearchInputBoxRef.current}
              toggleSearchSettings={toggleSearchSettingsDialog}
            />

            <Tooltip title="Help">
              <IconButton onClick={() => navigate("/how-to-use")}>
                <HelpCenterIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cart">
              <IconButton onClick={() => navigate("/cart")}>
                <Badge
                  badgeContent={cartItems ? cartItems.length : 0}
                  showZero
                  sx={{ "& .MuiBadge-badge": { bgcolor: "#ff4081" } }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <SearchSettingsDialog
          open={searchSettingsDialogOpen}
          onClose={() => setSearchSettingsDialogOpen(false)}
        />
      </AppBar>

      <Box
        sx={{
          pt: { xs: "56px", sm: "64px" },
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Container>
          {
            // we don't want to display this network error message when we are in search page
            // because it handle own error message
            networkError &&
              location.pathname !== "/search" &&
              location.pathname !== "/cart" && (
                <Box display="flex" justifyContent="center" mt={1} px={1}>
                  <NetworkError />
                </Box>
              )
          }
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
