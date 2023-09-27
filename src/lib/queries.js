// For movie

export const queryAllMovies = () => `*[_type == 'movie']`;

export const queryMoviesForListView = () => `*[_type == 'movie']{title, imdb, slug, posterImgUrl, posterImage}`;

export const queryMoviesForListViewWithPagination = (start, end) => `*[_type == 'movie'][${start}..${end}]{title, imdb, slug, posterImgUrl, posterImage}`;

export const queryMoviesWithPagination = (start, end) => `*[_type == 'movie'][${start}..${end}]`;

export const queryMovie = (slug) => `*[_type=='movie' && slug.current=='${slug}'][0]`;

export const queryMovieByID = (id) => `*[_type=='movie' && _id =='${id}'][0]`;

// For tv show

export const queryAllTvShows = () => `*[_type == 'tvShow']`;

export const queryTvShowsForListView = () => `*[_type == 'tvShow']{title, slug, posterImgUrl, posterImage}`

export const queryTvShowsForListViewWithPagination = (start, end) => `*[_type == 'tvShow'][${start}..${end}]{title, slug, posterImgUrl, posterImage}`;

export const queryTvShow = (slug) => `*[_type == 'tvShow' && slug.current == '${slug}'][0]`;

export const querySeasonsForListView = () => `*[_type == 'season']{title, imdb, slug, posterImgUrl, posterImage}`;

export const querySeasonsForListViewWithPagination = (start, end) => `*[_type == 'season'][${start}..${end}]{title, imdb, slug, posterImgUrl, posterImage}`;

export const querySeasonsOfTvShow = (tvShowSlug) => `*[_type == 'season' && references(*[_type == 'tvShow' && slug.current == '${tvShowSlug}']._id)]`;

export const queryAllSeasons = () => `*[_type == 'season']`;

// export const querySeasons = (tvShowId) => `*[_type == 'season' && tvShow._ref == ${tvShowId}]`;

export const querySeason = (slug) => `*[_type == 'season' && slug.current == '${slug}'][0]`;
export const querySeasonByID = (id) => `*[_type == 'season' && _id == '${id}'][0]`;

// Collection
export const queryAllCollections = () => `*[_type == 'collection']`;

export const queryCollection = (slug) => `*[_type=='collection' && slug.current=='${slug}'][0]`;

export const queryCollectionsForListView = () => `*[_type == 'collection']{name, slug, posterImgUrl, posterImage}`

export const queryCollectionsForListViewWithPagination = (start, end) => `*[_type == 'collection'][${start}..${end}]{name, slug, posterImgUrl, posterImage}`;

export const queryPromotion = () => `*[_type == 'promotion'][0]`;

export const queryPopular = () => `*[_type == 'popular']`;


