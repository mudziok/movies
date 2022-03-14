import { FC, useContext } from "react"
import { RateContext } from "../contexts/rateContext";
import { Movie } from "../movieList/movieApi"
import { ActorSummary } from "./actorSummary";
import { DetailsSection } from "./detailsSection";
import { StarRating } from "./starRating";
import { useCredits } from "./useCredits"

interface MovieDetailsProps {
    movie: Movie,
}

export const MovieDetails:FC<MovieDetailsProps> = ({movie}) => {
    const {ratings, rateMovie} = useContext(RateContext);
    const rating = ratings[movie.id] || 0;

    const credits = useCredits(movie.id);

    const stars = credits.filter(actor => actor.popularity > 15.0);
    const starSummaries = stars.map(actor => <ActorSummary key={actor.name} actor={actor}/>);

    return (
        <div className="relative w-full h-full overflow-auto">
            <div>
                <div className="w-full h-auto sm:h-72 overflow-hidden flex justify-center items-center">
                    <img src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`} className="w-full opacity-60" alt={movie.title}/>
                </div>
                <DetailsSection header={movie.title}>
                    <span className="m-2">{movie.release_date}</span>
                    <p className="m-2">{movie.overview}</p>
                </DetailsSection>
                <DetailsSection header="Rate this movie">
                    <StarRating rating={rating} onRate={rate => rateMovie(movie.id, rate)}/>
                </DetailsSection>
                { stars.length > 0 &&
                    <DetailsSection header="Starring">
                        <div className="overflow-auto">
                            <div className="flex w-max">
                                {starSummaries}
                            </div>
                        </div>
                    </DetailsSection>
                }
            </div>
        </div>
    )
}