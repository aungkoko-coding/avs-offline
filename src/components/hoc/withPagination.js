import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Stack, Pagination, PaginationItem, Button } from "@mui/material";
import { client } from "../../lib/client";
import { AppContext } from "../../context/AppContextProvider";

export default function withPagination(
  Component,
  query,
  queryForPagination,
  showPaginationButtons
) {
  return function (props) {
    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const { itemsPerPage, openNetworkError, networkError, closeNetworkError } =
      useContext(AppContext);

    let [searchParams] = useSearchParams();
    const paginateFor = searchParams.get("paginateFor");
    const currentPage =
      ((paginateFor === "movies" ||
        paginateFor === "tvShows" ||
        paginateFor === "collections") &&
        parseInt(searchParams.get("p"))) ||
      1;

    const memoizedQuery = useMemo(() => query(), []);
    // const memoizedPaginationQuery = useMemo(() => queryForPagination(startIndex, endIndex), [startIndex, endIndex]);

    useEffect(() => {
      if (itemsPerPage) {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = currentPage * itemsPerPage - 1;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        //console.log(startIndex, endIndex, endIndex - startIndex);

        client
          .fetch(queryForPagination(startIndex, endIndex))
          .then((res) => setData(res))
          .then(() => client.fetch(memoizedQuery))
          .then((res) => {
            // We need to close network error status when successfully re-fetched data
            if (networkError) {
              closeNetworkError();
            }
            setTotalPages(parseInt(Math.ceil(res.length / itemsPerPage)));
          })
          .catch(openNetworkError);
      }
    }, [currentPage, itemsPerPage]);

    return (
      <Stack sx={{ width: "100%", alignItems: "center", mt: 2 }}>
        <Component data={data} itemsPerPage={itemsPerPage} />
        {totalPages > 1 &&
          (showPaginationButtons ? (
            <Pagination
              page={currentPage}
              variant="outlined"
              count={totalPages || 1}
              showFirstButton={false}
              showLastButton={false}
              sx={{ mb: 1, mt: 2 }}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`?paginateFor=${Component.routeName}&p=${item.page}`}
                  {...item}
                />
              )}
            />
          ) : (
            <Button
              sx={{ textTransform: "none", mt: 1 }}
              LinkComponent={Link}
              to={`/${
                Component.routeName === "tvShows"
                  ? "tv-shows"
                  : Component.routeName
              }?paginateFor=${Component.routeName}&p=2`}
            >
              View More {">"}
            </Button>
          ))}
      </Stack>
    );
  };
}
