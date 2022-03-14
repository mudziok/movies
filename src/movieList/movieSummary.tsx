import { FC } from "react";
import { Movie } from "./movieApi";
import { CubeIcon, FilmIcon, ShieldCheckIcon, StarIcon as StarIconSolid, TrendingUpIcon } from "@heroicons/react/solid"

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

export const MovieSummary:FC<MovieSummaryProps> = ({movie, onClick = () => {}}) => {
    const voteAverageInfo = movie.vote_count === 0 ? "Unrated" : (movie.vote_average / 2).toPrecision(3);
    const voteDescription = 
        <div className="flex">
            <StarIconSolid className="w-5 relative"/>
            {voteAverageInfo}
        </div>

    const genreIcon = genreIcons[movie.genre_ids[0] % genreIcons.length];

    const releaseDateDescription = movie.release_date === "" ? <></> : <div>{movie.release_date}</div>

    return (
        <div className="m-2 w-40 flex flex-col justify-start items-center bg-neutral-800 text-neutral-200 cursor-pointer group relative" onClick={onClick}>
            <img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} className="w-full group-hover:scale-105 transition-transform" alt={movie.title}/>
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