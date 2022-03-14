import { ChangeEvent, useState } from "react";
import { BottomSheet } from "../common/bottomSheet";
import { RateContextProvider } from "../contexts/rateContext";
import { MovieDetails } from "../movieDetails/movieDetails";
import { Movie } from "../movieList/movieApi";
import { MovieList } from "../movieList/movieList";
import { useMovies } from "../movieList/useMovies";

export const MovieSearch = () => {
    const [query, setQuery] = useState<string>("Green");
    const [movies] = useMovies(query);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const onQueryTextfieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setQuery(event.target.value);
    }

    const selectMovie = (movie: Movie) => setSelectedMovie(movie);

    return (
        <RateContextProvider>
            <div className="text-neutral-200 m-2">
                <div className="m-4 flex flex-col">
                    <h4 className="text-lg px-4 py-2 font-semibold">Search for a movie:</h4>
                    <input 
                        type="text" 
                        onChange={onQueryTextfieldChange} value={query}
                        className="text-xl p-4 bg-neutral-800 rounded-full sm:w-96"
                        placeholder="Fight Club, Pulp Fiction..."
                    />
                </div>
                <MovieList movies={movies} onSelectMovie={selectMovie}/>
                <BottomSheet 
                    isOpen={selectedMovie !== null}
                    onBackgroundClick={() => setSelectedMovie(null)}
                >
                    <MovieDetails movie={selectedMovie!}/>
                </BottomSheet>
            </div>
        </RateContextProvider>
    )
};