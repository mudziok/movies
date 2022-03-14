import { FC } from "react";
import { Movie } from "./movieApi";
import { MovieSummary } from "./movieSummary";

interface MovieListProps {
    movies: Movie[],
    onSelectMovie: (movie: Movie) => void,
}

export const MovieList:FC<MovieListProps> = ({movies, onSelectMovie}) => {
    const summaries = movies.map(movie => 
        <MovieSummary key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)}/>
    );

    return (
        <div className="w-full overflow-x-scroll">
            <div className="flex w-max">
                {summaries}
            </div>
        </div>
    );
};