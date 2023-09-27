import DataSource from "./DataSource";

const movie = "movie", series = "series";

export const getAllData = () => {
    return Array.from(DataSource);
}

export const getAllMovies = (start, end) => {
    if(!start) start = 0;
    if(!end) end = -1;
    return getAllData().filter((data) => data.type === movie).slice(start, end);
}

export const getAllSeries = (start, end) => {
    if(!start) start = 0;
    if(!end) end = -1;
    return getAllData().filter((data) => data.type === series).slice(start, end);
}

export const getAllSeasons = (id, start, end) => {
    if(!start) start = 0;
    if(!end) end = -1;
    return getAllSeries().find((series) => series.id === id).series.slice(start, end);
}

export const getAllTitles = (start, end) => {
    if(!start) start = 0;
    if(!end) end = -1;
    return getAllData().map((data) => data.title).slice(start, end);
}

// return founded data array
export const findAllByTitle = (title, start, end) => {
    if(!start) start = 0;
    if(!end) end = -1;
    return getAllData().filter(data => data.title === title).slice(start, end);
}

export const findAllByTitles = (titleArr, start, end) => {
    if(!start) start = 0;
    if(!end) end = -1;

    let foundData = [];
    titleArr.map(title => {
        // getAllData().map(data => {
        //     if(data.title === title) {
        //         foundData.push(data);
        //     }
        // });
        foundData = [...foundData, ...findAllByTitle(title)];
    });
    return foundData.slice(start, end);
}


// finding by genre is different than finding by title or titles

// return one or more data if it includes specified genre
export const findAllByGenre = (genre, start, end) => {
    return getAllData().filter(data => data.genres.includes(genre)).slice(start, end);
}

// return one or more data even if it includes one or more genre of specified genres
// wrong implementation
export const findAllByGenres = (genreArr) => {
    return getAllData.filter(data => {
        for(let genre of genreArr) {
            if(data.genres.includes(genre)) {
                return true;
            }else return false;
        }
    })
}

// will return only one data after checking whether it includes all of specified genres
export const findByGenres = (genreArr) => {
    return getAllData().find(data => {
        let included = [];
        for(let genre of genreArr) {
            if(data.genres.includes(genre)) {
                included.push(true);
            }else {
                included.push(false);
            }
        }
        return !included.includes(false);
    })
}

// Need to implement some extra functions to get only Movies or Series