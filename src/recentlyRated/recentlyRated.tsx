import { FC, useContext, useEffect, useState } from "react";
import { BottomSheet } from "../common/bottomSheet";
import { RateContext } from "../contexts/rateContext";
import { MovieDetails } from "../movieDetails/movieDetails";
import { Movie, requestMovies } from "../movieList/movieApi";
import { MovieList } from "../movieList/movieList";

export const RecentlyRated:FC = () => {
    const {recentRatings} = useContext(RateContext);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const movieIds = Object.keys(recentRatings).map(key => +key);
            if (movieIds.length === 0) return;

            setMovies(await requestMovies(movieIds));
        }

        fetchMovies();
    }, [recentRatings]);

    return (
        <div className="text-neutral-200 m-2">
            <span className="text-3xl">Recently reviewed by You</span>
            <MovieList movies={movies} onSelectMovie={setSelectedMovie}/>
            <BottomSheet 
                isOpen={selectedMovie !== null}
                onBackgroundClick={() => setSelectedMovie(null)}
            >
                <MovieDetails movie={selectedMovie!}/>
            </BottomSheet>
        </div>
    )
}