import { FC } from "react";
import { Actor } from "../movieList/movieApi";

interface ActorSummaryProps {
    actor: Actor
}

export const ActorSummary:FC<ActorSummaryProps> = ({actor}) => {
    return (
        <div className="flex flex-col w-32 text-center m-2">
            <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} className="w-32" alt={actor.name}/>
            <span className="font-semibold">{actor.name}</span>
            <span>{actor.character}</span>
        </div>
    );
}