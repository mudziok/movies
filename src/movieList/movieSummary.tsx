import { FC, useContext } from "react";
import { Movie } from "./movieApi";
import { CubeIcon, FilmIcon, ShieldCheckIcon, StarIcon as StarIconSolid, TrendingUpIcon } from "@heroicons/react/solid"
import { RateContext } from "../contexts/rateContext";

interface MovieSummaryProps {
    movie: Movie,
    onClick?: () => void,
}

const genreIcons = [
    <CubeIcon />,
    <FilmIcon />,
    <ShieldCheckIcon />,
    <TrendingUpIcon />,
]

const average = (audienceVoteAverage: number, audienceVoteCount: number, userRating: number | undefined) => {
    const combinedVoteCount = audienceVoteCount + (userRating ? 0 : 1);

    if (userRating) {
        if (audienceVoteCount === 0) {
            return userRating.toPrecision(3);
        } else {
            const voteAverage = audienceVoteAverage / 2 * audienceVoteCount / combinedVoteCount + userRating / combinedVoteCount;
            return voteAverage.toPrecision(3);
        }
    } else {
        return audienceVoteCount === 0 ? "Unrated" : (audienceVoteAverage / 2).toPrecision(3);
    }
}

export const MovieSummary:FC<MovieSummaryProps> = ({movie, onClick = () => {}}) => {
    const {ratings} = useContext(RateContext);

    const voteAverageInfo = average(movie.vote_average, movie.vote_count, ratings[movie.id]);
    const voteDescription = 
        <div className="flex">
            <StarIconSolid className="w-5 relative"/>
            {voteAverageInfo}
        </div>

    const genreIcon = genreIcons[movie.genre_ids[0] % genreIcons.length];

    const releaseDateDescription = movie.release_date === "" ? <></> : <div>{movie.release_date}</div>

    return (
        <div className="m-2 w-40 flex flex-col justify-start items-center bg-neutral-800 text-neutral-200 cursor-pointer group relative" onClick={onClick}>
            <img src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} className="w-full group-hover:scale-105 transition-transform" alt={movie.title}/>
            <span className="absolute w-8 top-0 left-0">{genreIcon}</span>
            <div className="my-auto text-center w-full p-2">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
            </div>
            <div className="w-full flex justify-around items-center m-2 text-base">
                {releaseDateDescription}
                {voteDescription}
            </div>
        </div>
    );
};