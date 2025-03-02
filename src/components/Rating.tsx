import React, { useState } from 'react';
import emptyStar from '../assets/icons/emptystar.svg';
import filledStar from '../assets/icons/filledStar.svg';

interface RatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    onRatingChange(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || rating); // Filled if within hover or the rating

      stars.push(
        <span
          key={i}
          className="cursor-pointer"
          onClick={() => handleRatingChange(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <img
            src={isFilled ? filledStar : emptyStar}
            alt={`star-${i}`}
            className="w-6 h-6" // You can adjust the size here
          />
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-2">{renderStars()}</div>
    </div>
  );
};

export default Rating;
