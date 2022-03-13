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

export const requestMovies = async (query: string): Promise<Movie[]> => {
    const resonse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB}&query=${query}`);
    const data = await resonse.json();

    return data.results as Movie[];
};

export const requestCredits = async (movieId: number) => {
    const resonse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB}`);
    const data = await resonse.json();

    return data.cast as Actor[];
}
