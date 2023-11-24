import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Stack, Pagination, PaginationItem, Button } from "@mui/material";
import { client } from "../../lib/client";
import { AppContext } from "../../context/AppContextProvider";
import { useQuery } from "@tanstack/react-query";

export default function withPagination(
  Component,
  query,
  queryForPagination,
  showPaginationButtons
) {
  return function () {
    const { itemsPerPage, openNetworkError, networkError, closeNetworkError } =
      useContext(AppContext);

    const [searchParams] = useSearchParams();
    const paginateFor = searchParams.get("paginateFor");
    const currentPage =
      ((paginateFor === "movies" ||
        paginateFor === "tvShows" ||
        paginateFor === "collections") &&
        parseInt(searchParams.get("p"))) ||
      1;

    const { data: totalPages, isError: isTotalPagesError } = useQuery({
      queryKey: [query()],
      queryFn: () => client.fetch(query()),
      select: (data) => {
        if (!data) {
          return 1;
        }
        return parseInt(Math.ceil(data.length / itemsPerPage));
      },
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage - 1;
    const paginatedQuery = queryForPagination(startIndex, endIndex);
    const { data, isError: isPaginatedDataError } = useQuery({
      queryKey: [paginatedQuery],
      queryFn: () => {
        return client.fetch(paginatedQuery);
      },
    });

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [data]);

    useEffect(() => {
      if (isTotalPagesError || isPaginatedDataError) {
        openNetworkError();
      } else {
        if (networkError) closeNetworkError();
      }
    }, [isTotalPagesError, isPaginatedDataError, networkError]);

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
