import { FC } from "react";
import { Movie } from "./movieApi";

interface MovieSummaryProps {
    movie: Movie,
    onClick?: () => void,
}

export const MovieSummary:FC<MovieSummaryProps> = ({movie, onClick = () => {}}) => {
    const voteAverageInfo = movie.vote_count === 0 ? "Unrated" : movie.vote_average;
    const voteDescription = <div>⭐{voteAverageInfo}</div>

    const releaseDateDescription = movie.release_date === "" ? <></> : <div>{movie.release_date}</div>

    return (
        <div className="m-2 w-40 flex flex-col justify-start items-center bg-neutral-800 text-neutral-200 cursor-pointer group" onClick={onClick}>
            <img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} className="w-full group-hover:scale-105 transition-transform" alt={movie.title}/>
            <div className="my-auto text-center w-full p-2">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
            </div>
            <div className="w-full flex justify-around items-center m-2">
                {releaseDateDescription}
                {voteDescription}
            </div>
        </div>
    );
};