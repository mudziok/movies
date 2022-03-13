import { FC } from "react";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/solid"

interface StarRatingProps {
    rating: number,
    onRate: (rate: number) => void,
}

export const StarRating:FC<StarRatingProps> = ({rating, onRate}) => {
    const stars = [1,2,3,4,5].map(value => 
        <label key={value}>
            <input 
                className="hidden"
                type="radio"
                name="rating"
                value={value}
                onClick={() => onRate(value)}
            />
            {value > rating ? <StarIconOutline className="w-8"/> : <StarIconSolid className="w-8"/>}
        </label>
    )

    return (
        <div className="flex m-2 my-4 justify-around sm:w-72">
            {stars}
        </div>
    )
}