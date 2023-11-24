import { client } from "../lib/client";
import { queryAllMovies, queryAllSeasons } from "../lib/queries";

export const searchForMovies = "movies";
export const searchForTvShows = "tvShows";
export const searchForBoth = "both";
export const searchByGenre = "genre";
export const searchByTitle = "title";

const cache = new Map();

// invalidate cache on every 10 mins
setInterval(() => {
  cache.clear();
}, 1000 * 60 * 10);
// param (queryFor) might be movie, tvShow, or both
export async function fetchFromApi(queryFor = searchForBoth) {
  let result = [];
  const moviesQuery = queryAllMovies();
  const tvShowsQuery = queryAllSeasons();

  if (cache.has(queryFor)) {
    return cache.get(queryFor);
  }
  switch (queryFor) {
    case searchForMovies:
      result = await client.fetch(moviesQuery);
      break;
    case searchForTvShows:
      result = await client.fetch(tvShowsQuery);
      break;
    case searchForBoth:
      const movies = await client.fetch(moviesQuery);
      const tvShows = await client.fetch(tvShowsQuery);
      result = result
        .concat({ type: "movies", movies })
        .concat({ type: "tvShows", tvShows });
      break;
    default:
      throw new Error("Did not get what to query for!");
  }

  cache.set(queryFor, result);

  return result;
}

export function checkGenresInList(
  strictMode = false,
  genresList,
  searchGenres
) {
  if (strictMode) {
    // console.log("Operating on strict mode...");
    // version 1
    for (const genre of searchGenres) {
      if (!genresList?.includes(genre)) {
        return false;
      }
    }
    return true;

    // version 2
    // let included = [];
    // for (const g of searchGenres) {
    //     const genre = g.slice(0, 1).toUpperCase() + g.slice(1).toLowerCase();
    //     if (genresList?.includes(genre)) {
    //         included.push(true);
    //     } else {
    //         included.push(false);
    //     }
    // }
    // return !included.includes(false);
  } else {
    //console.log("Operating on non strict mode...");
    const searchGenresLength = searchGenres?.length;
    for (let i = 0; i < searchGenresLength; i++) {
      const searchGenre = searchGenres[i];
      const genre =
        searchGenre.slice(0, 1).toUpperCase() +
        searchGenre.slice(1).toLowerCase();
      if (genresList?.includes(genre)) {
        return true;
      } else {
        // if the genre is the last one
        if (i === searchGenres.length - 1) {
          return false;
        }
      }
    }
  }
  return false;
}

export async function checkItemInList(list, item) {
  if (!list) {
    throw new TypeError("list can't be undefined!");
  } else if (!item) {
    throw new TypeError("item can't be undefined!");
  } else {
    return !!list.find((i) => i.slug.current === item.slug.current);
  }
}

export function sortStringInAscendingOrder(string1, string2) {
  let sort = 0;
  let i = 0;
  while (sort === 0) {
    let charCode1 = string1.charCodeAt(i);
    let charCode2 = string2.charCodeAt(i);
    if (charCode1 && charCode2) {
      sort = charCode1 - charCode2;
      i++;
    } else break;
  }
  return sort;
}

export function sortStringInDescendingOrder(string1, string2) {
  let sort = 0;
  let i = 0;
  while (sort === 0) {
    let charCode1 = string1.charCodeAt(i);
    let charCode2 = string2.charCodeAt(i);
    if (charCode1 && charCode2) {
      sort = charCode2 - charCode1;
      i++;
    } else break;
  }
  return sort;
}

export function calculatePrice(promotion, price) {
  let calculatedPrice = price;
  try {
    if (promotion) {
      const from = new Date(promotion.from);
      const to = new Date(promotion.to);
      const current = new Date();
      if (from <= current && to >= current) {
        calculatedPrice =
          price - (parseFloat(price) / 100) * parseInt(promotion?.discount);
      }
    }
    return calculatedPrice;
  } catch {
    return undefined;
  }
}
