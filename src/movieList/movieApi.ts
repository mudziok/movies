export interface Movie {
    title: string,
    vote_average: number,
    id: number,
    release_date: string,
    genre_ids: number[],
    poster_path: string,
    backdrop_path: string,
    vote_count: number,
    overview: string,
}

export interface Actor {
    name: string,
    profile_path: string,
    character: string,
    popularity: number,
}

export const requestQuery = async (query: string): Promise<Movie[]> => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB}&query=${query}`);
    if (response.status !== 200) return [];

    try {
        const data = await response.json();
        return data.results as Movie[];
    } catch (error) {
        return [];
    }

};

export const requestCredits = async (movieId: number) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB}`);
    if (response.status !== 200) return [];

    try {
        const data = await response.json();
        return data.cast as Actor[];
    } catch (error) {
        return []
    }
}

export const requestMovies = async (movieIds: number[]) => {
    const promises = movieIds.map(id => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB}`))
    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map(response => response.json()));

    // mutate data to match Movie type
    const movies = data.map(movie => ({...movie, genre_ids: [movie.genres[0].id]}))
    return movies;
}
