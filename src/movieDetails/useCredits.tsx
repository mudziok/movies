import { useEffect, useState } from "react"
import { Actor, requestCredits } from "../movieList/movieApi";

export const useCredits = (movieId: number): Actor[] => {
    const [credits, setCredits] = useState<Actor[]>([]);

    useEffect(() => {
        requestCredits(movieId).then(requestedCredits => {
            setCredits(requestedCredits);
        });
    }, [movieId]);

    return credits;
}