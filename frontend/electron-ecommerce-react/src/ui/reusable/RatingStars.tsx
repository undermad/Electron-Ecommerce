import {Rating} from "react-simple-star-rating";

type RatingStarsProps = {
    currentRate: number,
}

export const RatingStars = ({currentRate}: RatingStarsProps) => {



    return (
        <Rating
            SVGstyle={{width: '20px'}}
            SVGclassName={'inline-block'}
            allowFraction={true}
            initialValue={currentRate}
            readonly={true}/>
    )
}