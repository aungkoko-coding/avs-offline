import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  LinearProgress,
  Pagination,
  PaginationItem,
  Portal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import {
  searchForBoth,
  searchForMovies,
  searchForTvShows,
  sortStringInAscendingOrder,
  sortStringInDescendingOrder,
} from "../api/Util";
import NetworkError from "../components/error/NetworkError";
import Item from "../components/item/SearchResultItem";
import Tags from "../components/nav/Tags";
import ResultNotFound from "../components/error/ResultNotFoundError";
import GridContainer from "../components/util/GridContainerV2";
import GridItem from "../components/util/GridItem";

const appRoot = document.querySelector("#root");
const ASCE = "asce";
const DESC = "desc";

export default function SearchResult() {
  const [result, setResult] = useState(null);
  const [paginationResult, setPaginationResult] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [sorting, setSorting] = useState(false);
  const [searchParams] = useSearchParams();
  const { itemsPerPage } = useContext(AppContext);
  const {
    networkError,
    searchingIndicator,
    searchFor: defaultSearchFor,
    closeSearchingIndicator,
    searchByGenre,
    searchByGenres,
    searchByTitle,
    searchByTitles,
    closeNetworkError,
    openNetworkError,
    openSearchingIndicator,
  } = useContext(AppContext);

  const searchFor = searchParams.get("q") || defaultSearchFor;
  const byTitle = searchParams.getAll("title");
  const byGenre = searchParams.getAll("genre");

  //console.log(byGenre);

  const handleSort = (event, newSortBy) => {
    setSortBy(newSortBy);
  };

  const openSorting = () => setSorting(true);
  const closeSorting = () => setSorting(false);

  useEffect(() => {
    if (searchingIndicator) {
      setResult(null);
      setPaginationResult(null);
      setSearchQuery(null);
    }
  }, [searchingIndicator]);

  useEffect(() => {
    if (result && result.length === 0) {
      document.title = "Result Not Found";
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.title = `Search : ${byTitle.join(", ")} ${byGenre.join(", ")}`;
    }
  }, [result, paginationResult]);

  useEffect(() => {
    // When the component is mounted without searching from searchInputBox (i.e, the
    // component is mounted when the user enter the link with 'search' path directly),
    // we need to open searching indicator
    if (!networkError && !result && !searchingIndicator) {
      openSearchingIndicator();
    }
  }, []);

  // sort
  useEffect(() => {
    if (paginationResult) {
      //console.log('sorting');
      (async () => {
        let res = paginationResult;
        openSorting();
        if (sortBy === ASCE) {
          res = paginationResult.sort((item1, item2) =>
            sortStringInAscendingOrder(item1.title, item2.title)
          );
        } else if (sortBy === DESC) {
          res = paginationResult.sort((item1, item2) =>
            sortStringInDescendingOrder(item1.title, item2.title)
          );
        }
        return res;
      })().then((res) => {
        setPaginationResult(res);
        closeSorting();
      });
    }
  }, [sortBy]);

  useEffect(() => {
    const handleResult = (res) => {
      let result = res;
      if (sortBy === ASCE) {
        result = res.sort((item1, item2) =>
          sortStringInAscendingOrder(item1.title, item2.title)
        );
      } else if (sortBy === DESC) {
        result = res.sort((item1, item2) =>
          sortStringInDescendingOrder(item1.title, item2.title)
        );
      }

      if (networkError) {
        closeNetworkError();
      }
      closeSearchingIndicator();
      setTotalPages(parseInt(Math.ceil(result.length / itemsPerPage)));
      setResult(result);
    };

    const prevGenre = localStorage.getItem("byGenre") || "";
    const prevTitle = localStorage.getItem("byTitle") || "";

    localStorage.setItem("byGenre", JSON.stringify(byGenre));
    localStorage.setItem("byTitle", JSON.stringify(byTitle));

    // we will search when searching indicator is open or browser history change
    if (
      searchingIndicator ||
      ((JSON.stringify(byTitle) !== prevTitle ||
        JSON.stringify(byGenre) !== prevGenre) &&
        !result)
    ) {
      //console.log('querying')
      if (byTitle.length > 0) {
        if (searchFor === searchForMovies) {
          if (byTitle.length === 1) {
            search(searchByTitle, byTitle[0], searchForMovies);
          } else if (byTitle.length > 1) {
            search(searchByTitles, byTitle, searchForMovies);
          }
        } else if (searchFor === searchForTvShows) {
          if (byTitle.length === 1) {
            search(searchByTitle, byTitle[0], searchForTvShows);
          } else if (byTitle.length > 1) {
            search(searchByTitles, byTitle, searchForTvShows);
          }
        } else if (searchFor === searchForBoth) {
          if (byTitle.length === 1) {
            search(searchByTitle, byTitle[0], searchForBoth);
          } else if (byTitle.length > 1) {
            search(searchByTitles, byTitle, searchForBoth);
          }
        } else handleResult([]);
      } else if (byGenre.length > 0) {
        if (searchFor === searchForMovies) {
          if (byGenre.length === 1) {
            search(searchByGenre, byGenre[0], searchForMovies);
          } else if (byGenre.length > 1) {
            search(searchByGenres, byGenre, searchForMovies);
          }
        } else if (searchFor === searchForTvShows) {
          if (byGenre.length === 1) {
            search(searchByGenre, byGenre[0], searchForTvShows);
          } else if (byGenre.length > 1) {
            search(searchByGenres, byGenre, searchForTvShows);
          }
        } else if (searchFor === searchForBoth) {
          if (byGenre.length === 1) {
            search(searchByGenre, byGenre[0], searchForBoth);
          } else if (byGenre.length > 1) {
            search(searchByGenres, byGenre, searchForBoth);
          }
        } else handleResult([]);
      } else {
        handleResult([]);
      }
    }

    function search(fun, ...args) {
      fun(...args)
        .then(handleResult)
        .catch((e) => {
          openNetworkError();
          console.log(e);
        });
    }
  }, [searchingIndicator, byGenre, byTitle]); // perform search operation only when searchingIndicator open

  const currentPage = parseInt(searchParams.get("p")) || 1;
  useEffect(() => {
    //console.log('running pagination result');

    if (itemsPerPage && result) {
      let startIndex = (currentPage - 1) * itemsPerPage;
      let endIndex = currentPage * itemsPerPage;

      let paginationResult = result.slice(startIndex, endIndex);

      //console.log(startIndex, endIndex, endIndex - startIndex);
      if (sortBy) {
        (async () => {
          openSorting();
          if (sortBy === ASCE) {
            paginationResult = paginationResult.sort((item1, item2) =>
              sortStringInAscendingOrder(item1.title, item2.title)
            );
          } else if (sortBy === DESC) {
            paginationResult = paginationResult.sort((item1, item2) =>
              sortStringInDescendingOrder(item1.title, item2.title)
            );
          }
          return paginationResult;
        })().then((res) => {
          setPaginationResult(res);
          closeSorting();
        });
      } else {
        setPaginationResult(paginationResult);
      }
    }
  }, [itemsPerPage, currentPage, result]);

  useEffect(() => {
    if (totalPages > 0 && !searchQuery) {
      //const searchP = new URL(document.URL);
      //console.log('running')
      if (byGenre && byGenre.length > 0) {
        const genreLastIndex = byGenre.length - 1;
        if (byGenre.length === 1) {
          setSearchQuery(`genre=${byGenre[0]}`);
        } else {
          const genreQueryArr = byGenre.map((g, i) => {
            let q = "";
            if (i === genreLastIndex) {
              q += `genre=${g}`;
            } else q += `genre=${g}&`;
            return q;
          });
          setSearchQuery(genreQueryArr.join(""));
        }
      } else if (byTitle && byTitle.length > 0) {
        const lastIndex = byTitle.length - 1;
        if (byTitle.length === 1) {
          //searchP.searchParams.set('title', byTitle[0])
          setSearchQuery(`title=${byTitle[0]}`);
        } else {
          const titleQueryArr = byTitle.map((t, i) => {
            //searchP.searchParams.append('title', t);
            let q = "";
            if (i === lastIndex) {
              q += `title=${t}`;
            } else q += `title=${t}&`;
            return q;
          });
          setSearchQuery(titleQueryArr.join(""));
        }
        //console.log(searchP.search);
      }
    }
  }, [byGenre, byTitle]);
  return (
    <Box position="relative" width="100%" py={1}>
      <Box mt={0.5} display="flex" justifyContent="space-between">
        <Typography fontSize="1.5rem" sx={{ flexShrink: 1 }}>
          Result:{" "}
          <Typography component="span" color="primary" fontSize="inherit">
            {byTitle.length !== 0 || byGenre.length !== 0 ? (
              byGenre.join(", ") + byTitle.join(", ")
            ) : (
              <Typography component="span" color="error" fontSize="inherit">
                Your url search param is empty!
              </Typography>
            )}
          </Typography>
        </Typography>

        <Box display="flex" alignItems="center" flexShrink={0}>
          <ToggleButtonGroup
            disabled={searchingIndicator}
            size="small"
            exclusive
            value={sortBy}
            onChange={handleSort}
          >
            <ToggleButton value={ASCE}> A - Z </ToggleButton>
            <ToggleButton value={DESC}> Z - A </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
        }}
      >
        {paginationResult && paginationResult.length > 0 && (
          <GridContainer>
            {paginationResult.map((item, i) => {
              return (
                <GridItem key={item._id}>
                  <Item data={item} />
                </GridItem>
              );
            })}
          </GridContainer>
        )}
        {totalPages > 1 && result && (
          <Pagination
            page={currentPage}
            variant="outlined"
            count={totalPages || 1}
            showFirstButton
            showLastButton
            sx={{ mb: 1, mt: 2 }}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`?${searchQuery}&p=${item.page}`}
                {...item}
              />
            )}
          />
        )}
      </Box>
      <Box>
        {paginationResult && paginationResult.length === 0 && (
          <ResultNotFound
            message={
              byGenre.length !== 0 || byTitle.length !== 0
                ? "The result you search for could't be found!"
                : "Try to search by clicking the search icon!"
            }
          />
        )}
      </Box>
      {(searchingIndicator || sorting) && (
        <Portal
          container={appRoot}
          children={
            <BusyIndicator
              shape={sorting ? "circular" : "linear"}
              message={sorting ? "" : "Searching..."}
            />
          }
        />
      )}

      <NetworkError />

      {!searchingIndicator && (
        <React.Fragment>
          <Divider sx={{ mt: 2 }} />
          <Tags mt={2} />
        </React.Fragment>
      )}
    </Box>
  );
}

function BusyIndicator({ shape, message }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="50%"
      left="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
    >
      {message && (
        <Typography variant="h6" sx={{ letterSpacing: "2px" }}>
          {message}
        </Typography>
      )}
      {shape === "linear" ? (
        <LinearProgress
          variant="indeterminate"
          sx={{
            width: "200px",
          }}
        />
      ) : (
        <CircularProgress variant="indeterminate" />
      )}
    </Box>
  );
}
