import React from "react";
import avatar from "../assets/Avatar.png";
import emptystar from "../assets/icons/emptystar.svg";
import filledstar from "../assets/icons/filledStar.svg";

interface FeedbackProps {
  img: string;
  name: string;
  rating: string; // Assuming rating is a string that can be converted to a number
  date: string;
  feedback: string;
}

const FeedbackCard: React.FC<FeedbackProps> = ({
  name,
  date,
  feedback,
  img,
  rating,
}) => {
  const ratingValue = parseFloat(rating);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={i}
          src={i < rating ? filledstar : emptystar}
          alt={i < rating ? "Filled Star" : "Empty Star"}
          className="w-4 h-4"
        />
      );
    }
    return stars;
  };

  return (
    <div
      data-testid="feedback-card"
      className="w-full h-auto rounded-3xl shadow-[0_0_11px_0_rgba(0,0,0,0.12)] font-lexend text-[0.9rem]"
    >
      <div className="flex p-5 gap-2">
        <div className="w-[5em] h-[5em] bg-red-50 rounded-full">
          <img
            className="w-full h-full object-cover rounded-full"
            src={img}
            alt="user-img"
            onError={(e) => {
              const target = e.target as HTMLImageElement; // Type assertion
              target.src = avatar; // Set fallback avatar
            }}
          />
        </div>
        <div className="flex ml-1 flex-col gap-2">
          <div className="flex justify-center gap-2 flex-wrap">
              <h1 className="text-[#323A3A] font-500 font-lexend">{name}</h1>
              <div className="flex gap-0 justify-center items-center">{renderStars(ratingValue)}</div>
          </div>
            <p className="font-lexend font-400 text-[#909090]">
              {new Date(date).toLocaleDateString()}
            </p>
        </div>
      </div>
      <div>
        <div className="pl-5 pr-5 pb-5 font-lexend text-[#323A3A] text-200 text-[0.9rem]">
          <p>{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
