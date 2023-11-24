import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Movies from "./routes/Movies";
import MovieDetail from "./routes/MovieDetail";
import TVShows from "./routes/TVShows";
import TVShowDetail from "./routes/TVShowDetail";
import Collections from "./routes/Collections";
import GetStart from "./routes/GetStart";
import AllShows from "./routes/AllShows";
import AppContextProvider from "./context/AppContextProvider";
import SearchResult from "./routes/SearchResult";
import PageNotFoundError from "./components/error/PageNotFoundError";
import CollectionDetail from "./routes/CollectionDetail";
import Cart from "./routes/Cart";
import Help from "./routes/Help";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 30,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<AllShows />} />
            <Route path="getting-start" element={<GetStart />} />

            <Route path="movies" element={<Movies />} />
            <Route path="movies/:slug" element={<MovieDetail />} />

            <Route path="tv-shows" element={<TVShows />} />
            <Route path="tv-shows/:slug" element={<TVShowDetail />} />

            <Route path="collections" element={<Collections />} />
            <Route path="collections/:slug" element={<CollectionDetail />} />

            <Route path="search" element={<SearchResult />} />

            <Route path="cart" element={<Cart />} />

            <Route path="how-to-use" element={<Help />} />

            <Route path="*" element={<PageNotFoundError />} />
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  </QueryClientProvider>
);
