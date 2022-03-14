import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../common/useDebounce";
import { Movie, requestQuery } from "./movieApi";

export const useQuery = (query: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const updateMovies = useCallback(() => {
        if (query === "") return;
        requestQuery(query).then(requestedMovies => {
            setMovies(requestedMovies)
        });
    }, [query]);

    useDebounce(updateMovies, 500, [query]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(updateMovies, []);

    return [movies];
};