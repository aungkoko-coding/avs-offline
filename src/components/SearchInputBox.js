import React, { useState, useEffect, useContext } from "react";
import {
  Popper,
  Grow,
  Paper,
  CircularProgress,
  ClickAwayListener,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import {
  searchByTitle,
  searchByGenre,
  fetchFromApi,
  searchForBoth,
} from "../api/Util";

const filter = createFilterOptions();

export default function SearchInputBox({
  open,
  onClose,
  anchorEl,
  toggleSearchSettings,
}) {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const navigateTo = useNavigate();

  const {
    strictMode,
    genres,
    genreValues,
    searchFor,
    searchBy,
    networkError,
    closeNetworkError,
    openSearchingIndicator,
    multipleSearchMode,
  } = useContext(AppContext);

  const [options, setOptions] = useState("");
  const [openAC, setOpenAc] = useState(false);
  const loading = openAC && options.length === 0 && searchBy === searchByTitle;

  useEffect(() => {
    if (searchBy === searchByTitle) {
      setOptions([]);
    }
  }, [searchBy]);

  useEffect(() => {
    let active = true;

    if (searchBy === searchByGenre) {
      if (genreValues) {
        setOptions(Object.getOwnPropertyNames(genreValues));
      } else {
        setOptions(genres);
      }
    } else if (searchBy === searchByTitle) {
      if (!loading) {
        return undefined;
      }

      (async () => {
        if (active) {
          let result = await fetchFromApi(searchForBoth);
          let optionsForAc = [];

          if (result) {
            result.forEach((res) => {
              if (res.type === "movies") {
                res.movies?.forEach((movie) => {
                  optionsForAc.push(movie.title);
                });
              } else {
                res.tvShows?.forEach((tvShow) => {
                  optionsForAc.push(tvShow.title);
                });
              }
            });
          }

          setOptions(
            Array.from(new Set(getHistory().slice(-5).concat(optionsForAc)))
          );
        }
      })(); // End immediately invoked async function
    }

    return () => (active = false);
  }, [searchBy, genres, genreValues, loading]);

  useEffect(() => {
    if (multipleSearchMode) {
      setValue([]);
    } else setValue("");
  }, [searchBy, multipleSearchMode]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!value || value.length === 0) {
      return;
    }

    let searchParams = new URLSearchParams();
    searchParams.set("q", searchFor);
    if (searchBy === searchByGenre) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append("genre", v));
      } else if (value.inputValue) {
        searchParams.set("genre", value.inputValue.trimEnd());
      } else searchParams.set("genre", value.trimEnd());
    } else if (searchBy === searchByTitle) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append("title", v));
      } else if (value.inputValue) {
        searchParams.set("title", value.inputValue.trimEnd());
      } else searchParams.set("title", value.trimEnd());
      saveToHistory(searchParams.getAll("title"));
    }
    location.search = searchParams;

    navigateTo(`/search?${location.search}`);
    openSearchingIndicator();
    if (networkError) {
      closeNetworkError();
    }

    // when you implemented virtualization, you can remove the block of code below
    if (multipleSearchMode) {
      setValue([]);
    } else setValue("");

    onClose();
  }

  function handleChange(e, newValue) {
    if (Array.isArray(newValue)) {
      setValue(
        newValue.map((value) => {
          // if the freeSolo mode is on, we need to check this
          if (value.inputValue) {
            return value.inputValue;
          } else return value;
        })
      );
    } else {
      setValue(newValue);
    }
  }

  function handleInputChange(e, newValue) {
    setInputValue(newValue);
  }

  function saveToHistory(titles) {
    if (titles.length > 0) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = history.concat(
        titles.filter((title) => !history.includes(title))
      );
      localStorage.setItem("history", JSON.stringify(history));
    }
  }

  function getHistory() {
    return JSON.parse(localStorage.getItem("history")) || [];
  }

  return (
    <Popper // for search box
      sx={{ zIndex: 1 }}
      open={open}
      anchorEl={anchorEl}
      placement="top-end"
      transition
      disablePortal
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100vw", sm: 400 },
            }}
          >
            <ClickAwayListener onClickAway={onClose}>
              <form onSubmit={handleSubmit}>
                <Autocomplete
                  open={openAC}
                  onOpen={() => setOpenAc(true)}
                  onClose={() => setOpenAc(false)}
                  value={value}
                  inputValue={inputValue}
                  onChange={handleChange}
                  onInputChange={handleInputChange}
                  options={
                    inputValue || searchBy === searchByGenre
                      ? options
                      : options.slice(0, 6)
                  }
                  freeSolo={searchBy === searchByTitle}
                  multiple={multipleSearchMode}
                  limitTags={3}
                  loading={loading}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    // const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== "" && searchBy === searchByTitle) {
                      console.log("Filtered");
                      filtered.push({
                        inputValue,
                        title: `Search "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  sx={{
                    width: { xs: "80vw", sm: 300 },
                    p: 1,
                    "& .MuiFormHelperText-root": {
                      color: (theme) => theme.palette.warning.main,
                    },
                  }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props}>
                        {typeof option === "string" ? option : option.title}
                      </li>
                    );
                  }}
                  openOnFocus={false}
                  disableCloseOnSelect={multipleSearchMode}
                  autoComplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      autoFocus
                      label="Search"
                      type="search"
                      helperText={strictMode ? "Strict mode is ON!" : ""}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </form>
            </ClickAwayListener>
            <Tooltip title="Customize your search!">
              <IconButton
                onClick={handleSubmit}
                sx={{ flex: "0 0 auto", mt: strictMode ? "-20px" : "0px" }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Customize your search!">
              <IconButton
                onClick={toggleSearchSettings}
                sx={{ flex: "0 0 auto", mt: strictMode ? "-20px" : "0px" }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
