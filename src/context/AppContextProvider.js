import React, { createContext, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  checkGenresInList,
  checkItemInList,
  fetchFromApi,
  searchForBoth,
  searchForMovies,
  searchForTvShows,
} from "../api/Util";

const genres = [
  "Action",
  "Comedy",
  "Horror",
  "Thriller",
  "Adventure",
  "Sci-Fi",
  "Fantasy",
];

export const AppContext = createContext({
  networkError: false,
  searchingIndicator: false,
  searchInputBoxOpen: false,
  itemsPerPage: 0,
  strictMode: false,
  multipleSearchMode: false,
  searchBy: "name",
  searchFor: "movies",
  cartItems: [],
  genres,
  tags: [],
  setTags: () => {},
  genreValues: {},
  setGenreValues: () => {},
  openNetworkError: () => {},
  closeNetworkError: () => {},
  openSearchingIndicator: () => {},
  closeSearchingIndicator: () => {},
  toggleStrictMode: () => {},
  toggleMultipleSearchMode: () => {},
  changeSearchBy: () => {},
  changeSearchFor: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  searchByGenre: async () => {},
  searchByGenres: async () => {},
  searchByTitle: async () => {},
  searchByTitles: async () => {},
});

export default function ContextProvider(props) {
  const [tags, setTags] = useState(undefined);
  const [genreValues, setGenreValues] = useState(undefined);
  const [networkError, setNetworkError] = useState(false);
  const [searchingIndicator, setSearchingIndicator] = useState(false);
  const [searchInputBoxOpen, setSearchInputBoxOpen] = useState(false);
  const [strictMode, setStrictMode] = useState(
    JSON.parse(localStorage.getItem("strictMode")) || false
  );
  const [multipleSearchMode, setMultipleSearchMode] = useState(
    JSON.parse(localStorage.getItem("multipleSearchMode")) || false
  );
  const [searchBy, setSearchBy] = useState(
    localStorage.getItem("searchBy") || "title"
  );
  const [searchFor, setSearchFor] = useState(
    localStorage.getItem("searchFor") || "both"
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [promotion, setPromotion] = useState(undefined);

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));

  if (!itemsPerPage) {
    if (xs) {
      setItemsPerPage(12);
    } else if (sm) {
      setItemsPerPage(15);
    } else if (md) {
      setItemsPerPage(18);
    } else if (lg) {
      setItemsPerPage(24);
    } else if (xl) {
      setItemsPerPage(24);
    }
  }

  const closeNetworkError = () => {
    setNetworkError(false);
  };

  const openSearchingIndicator = () => {
    closeNetworkError();
    setSearchingIndicator(true);
  };

  const closeSearchingIndicator = () => {
    setSearchingIndicator(false);
  };

  const openNetworkError = () => {
    setNetworkError(true);
    closeSearchingIndicator();
  };

  const openSearchInputBox = (e) => {
    setSearchInputBoxOpen(true);
  };

  const toggleStrictMode = () => {
    setStrictMode((prevMode) => {
      const changedMode = !prevMode;
      localStorage.setItem("strictMode", changedMode);
      return changedMode;
    });
  };

  const toggleMultipleSearchMode = () => {
    setMultipleSearchMode((prevMode) => {
      const changedMode = !prevMode;
      localStorage.setItem("multipleSearchMode", changedMode);
      return changedMode;
    });
  };

  const changeSearchBy = (e) => {
    localStorage.setItem("searchBy", e.target.value);
    setSearchBy(e.target.value);
  };

  const changeSearchFor = (e) => {
    localStorage.setItem("searchFor", e.target.value);
    setSearchFor(e.target.value);
  };

  const addToCart = async (item) => {
    const isItemExist = await checkItemInList(cartItems, item);
    if (isItemExist) {
      return { isSaved: false, message: "Item already exist!" };
    } else {
      setCartItems((items) => {
        let price = 0;
        if (item._type === "movie") {
          price = item.price || 300;
        } else if (item._type === "season") {
          price = item.price || 750;
        } else {
          price = item.price || 3000;
        }
        let updatedItems = [...items, { ...item, price }];
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return updatedItems;
      });
      return { isSaved: true, message: "Added to cart!" };
    }
  };

  const removeFromCart = async (item) => {
    const isItemExist = await checkItemInList(cartItems, item);
    if (isItemExist) {
      setCartItems((items) => {
        let updatedItems = items.filter(
          (i) => i.slug.current !== item.slug.current
        );
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return updatedItems;
      });
      return true;
    } else return false;
  };

  // Let's consider season as tvShow
  // this function won't be affected by strict mode
  const searchByGenre = async (genre, searchFor) => {
    const result = await fetchFromApi(searchFor);

    if (result && result.length >= 1) {
      if (searchFor === searchForMovies) {
        return result.filter((movie) => movie.genres?.includes(genre));
      } else if (searchFor === searchForTvShows) {
        return result.filter((tvShow) => tvShow.genres?.includes(genre));
      } else if (searchFor === searchForBoth) {
        let res = [];
        result.forEach((data) => {
          if (data.type === searchForMovies) {
            const movies = data.movies?.filter((movie) =>
              movie.genres?.includes(genre)
            );
            if (movies && movies.length >= 1) {
              movies.forEach((movie) => {
                res.push(movie);
              });
            }
          }
          if (data.type === searchForTvShows) {
            const filteredTvShows = data.tvShows?.filter((tvShow) =>
              tvShow.genres?.includes(genre)
            );
            filteredTvShows.forEach((tvShow) => {
              res.push(tvShow);
            });
          }
        });

        return res;
      }
      return [];
    }

    return [];
  };

  // Let's consider season as tvShow
  // This function will be affected by strict mode
  const searchByGenres = async (genres, searchFor) => {
    const result = await fetchFromApi(searchFor);

    if (result && result.length >= 1) {
      if (searchFor === searchForMovies) {
        return result.filter((movie) => {
          return checkGenresInList(strictMode, movie.genres, genres);
        });
      } else if (searchFor === searchForTvShows) {
        return result.filter((tvShow) => {
          return checkGenresInList(strictMode, tvShow.genres, genres);
        });
      } else if (searchFor === searchForBoth) {
        // search for both
        let res = [];
        result.forEach((data) => {
          if (data.type === searchForMovies) {
            const filteredMovies = data.movies?.filter((movie) => {
              return checkGenresInList(strictMode, movie.genres, genres);
            });
            if (filteredMovies && filteredMovies.length >= 1) {
              filteredMovies.forEach((movie) => {
                res.push(movie);
              });
            }
          }
          if (data.type === searchForTvShows) {
            const filteredTvShows = data.tvShows?.filter((tvShow) => {
              return checkGenresInList(strictMode, tvShow.genres, genres);
            });
            if (filteredTvShows && filteredTvShows.length >= 1) {
              filteredTvShows.forEach((tvShow) => {
                res.push(tvShow);
              });
            }
          }
        });

        return res;
      }
      return [];
    } else return [];
  };

  // this function will be affected by strict mode
  const searchByTitle = async (title, searchFor) => {
    const result = await fetchFromApi(searchFor);

    if (result && result.length >= 1) {
      if (searchFor === searchForMovies) {
        return result.filter((movie) => {
          const movieTitle = movie.title.toString().toLowerCase();
          const searchTitle = title.toString().toLowerCase();
          return strictMode
            ? movieTitle === searchTitle
            : searchTitle.includes(movieTitle) ||
                movieTitle.includes(searchTitle);
        });
      } else if (searchFor === searchForTvShows) {
        return result.filter((tvShow) => {
          const tvShowTitle = tvShow.title.toString().toLowerCase();
          const searchTitle = title.toString().toLowerCase();
          return strictMode
            ? tvShowTitle === searchTitle
            : searchTitle.includes(tvShowTitle) ||
                tvShowTitle.includes(searchTitle);
        });
      } else if (searchFor === searchForBoth) {
        let finalResult = [];
        result.forEach((res) => {
          if (res.type === searchForMovies) {
            const filteredMovies = res.movies?.filter((movie) => {
              const movieTitle = movie.title.toString().toLowerCase();
              const searchTitle = title.toString().toLowerCase();
              return strictMode
                ? movieTitle === searchTitle
                : searchTitle.includes(movieTitle) ||
                    movieTitle.includes(searchTitle);
            });
            filteredMovies.forEach((movie) => finalResult.push(movie));
          } else if (res.type === searchForTvShows) {
            const filteredTvShows = res.tvShows?.filter((tvShow) => {
              const tvShowTitle = tvShow.title.toString().toLowerCase();
              const searchTitle = title.toString().toLowerCase();
              return strictMode
                ? tvShowTitle === searchTitle
                : searchTitle.includes(tvShowTitle) ||
                    tvShowTitle.includes(searchTitle);
            });
            filteredTvShows.forEach((tvShow) => finalResult.push(tvShow));
          }
        });

        return finalResult;
      }
    }
    return [];
  };

  const searchByTitles = async (titles, searchFor) => {
    const result = await fetchFromApi(searchFor);

    if (result && result.length >= 1) {
      if (searchFor === searchForMovies) {
        return result.filter((movie) => {
          if (strictMode) {
            for (const title of titles) {
              if (title.toLowerCase() === movie.title.toLowerCase()) {
                return true;
              }
            }
          } else {
            for (const title of titles) {
              if (movie.title.toLowerCase().includes(title.toLowerCase())) {
                return true;
              }
            }
          }
          return false;
        });
      } else if (searchFor === searchForTvShows) {
        return result.filter((tvShow) => {
          if (strictMode) {
            for (const title of titles) {
              if (title.toLowerCase() === tvShow.title.toLowerCase()) {
                return true;
              }
            }
          } else {
            for (const title of titles) {
              if (tvShow.title.toLowerCase().includes(title.toLowerCase())) {
                return true;
              }
            }
          }
          return false;
        });
      } else if (searchFor === searchForBoth) {
        let finalResult = [];
        const filteredMovies = result
          .find((res) => res.type === searchForMovies)
          .movies.filter((movie) => {
            if (strictMode) {
              for (const title of titles) {
                if (title.toLowerCase() === movie.title.toLowerCase()) {
                  return true;
                }
              }
            } else {
              for (const title of titles) {
                if (movie.title.toLowerCase().includes(title.toLowerCase())) {
                  return true;
                }
              }
            }
            return false;
          });

        filteredMovies.forEach((movie) => {
          finalResult.push(movie);
        });

        const filteredTvShows = result
          .find((res) => res.type === searchForTvShows)
          .tvShows.filter((tvShow) => {
            if (strictMode) {
              for (const title of titles) {
                if (title.toLowerCase() === tvShow.title.toLowerCase()) {
                  return true;
                }
              }
            } else {
              for (const title of titles) {
                if (tvShow.title.toLowerCase().includes(title.toLowerCase())) {
                  return true;
                }
              }
            }
            return false;
          });

        filteredTvShows.forEach((tvShow) => {
          finalResult.push(tvShow);
        });

        return finalResult;
      }
      return [];
    }
    return [];
  };

  async function getLastAddedMoviesAndTvShows(count) {
    let lastAdded = [];
    const half = Math.ceil(count / 2);
    let data = await fetchFromApi(searchForBoth);
    let movies = data.find((res) => (res.type = searchForMovies))?.movies;
    let tvShows = data.find((res) => res.type === searchForTvShows)?.tvShows;

    const now = new Date();
    const last30Days = new Date(
      `${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`
    );

    let filteredMovies = movies.filter((movie) => {
      return movie._createdAt >= last30Days;
    });

    let filteredTvShows = tvShows.filter((tvShow) => {
      return tvShow._createdAt >= last30Days;
    });

    if (filteredMovies.length > 0) {
    } else {
      if (movies && movies.length > 0) {
        if (half > movies.length) {
          movies = movies.slice(0);
        } else {
          movies = movies.slice(movies.length - half);
        }
      }
    }

    if (filteredTvShows.length > 0) {
    } else {
      if (tvShows && tvShows.length > 0) {
        if (half > tvShows.length) {
          tvShows = tvShows.slice(0);
        } else {
          tvShows = tvShows.slice(tvShows.length - half);
        }
      }
    }

    lastAdded = lastAdded.concat(movies).concat(tvShows);
  }

  return (
    <AppContext.Provider
      value={{
        itemsPerPage,
        networkError,
        searchingIndicator,
        searchInputBoxOpen,
        strictMode,
        multipleSearchMode,
        searchBy,
        searchFor,
        cartItems,
        genres,
        tags,
        setTags,
        promotion,
        setPromotion,
        genreValues,
        setGenreValues,
        openNetworkError,
        closeNetworkError,
        openSearchingIndicator,
        closeSearchingIndicator,
        setSearchInputBoxOpen,
        toggleStrictMode,
        toggleMultipleSearchMode,
        changeSearchBy,
        changeSearchFor,
        addToCart,
        removeFromCart,
        searchByGenre,
        searchByGenres,
        searchByTitle,
        searchByTitles,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
