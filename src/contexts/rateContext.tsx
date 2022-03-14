import { createContext, FC, useCallback, useEffect, useState } from "react";

interface Ratings {
    [key: number]: number,
}

export const RateContext = createContext({
    ratings: {} as Ratings,
    recentRatings: {} as Ratings,
    rateMovie: (movieId: number, rating: number) => {},
});

export const RateContextProvider:FC = ({children}) => {
    const [ratings, setRatings] = useState<Ratings>(() => {
        const localRatingsJSON = localStorage.getItem('ratings');
        return localRatingsJSON ? JSON.parse(localRatingsJSON) : {};
    });

    const [recentRatings, setRecentRatings] = useState<Ratings>({});

    const rateMovie = useCallback((movieId: number, rating: number) => {
        setRatings(prev => ({...prev, [movieId]: rating}));
        setRecentRatings(prev => ({...prev, [movieId]: rating}))
    }, []);

    useEffect(() => {
        localStorage.setItem('ratings', JSON.stringify(ratings));   
    }, [rateMovie, ratings])

    return (
        <RateContext.Provider value={{ratings, recentRatings, rateMovie}}>
            {children}
        </RateContext.Provider>
    )
}