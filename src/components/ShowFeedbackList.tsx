import React from "react";
import FeedbackCard from "./FeedbackCard";

export type Feedback = {
  imageURL: string;
  clientName: string;
  rating: string;
  date: string;
  text: string;
};

interface FeedbackListProps {
  currentFeedbacks: Feedback[];
}

const ShowFeedbackList: React.FC<FeedbackListProps> = ({
  currentFeedbacks,
}) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {currentFeedbacks && currentFeedbacks.length > 0 ? (
        currentFeedbacks.map((feedback, index) => {
          return (
            <FeedbackCard
              key={index}
              img={feedback.imageURL}
              name={feedback.clientName}
              rating={feedback.rating}
              date={feedback.date}
              feedback={feedback.text}
            />
          );
        })
      ) : (
        null
      )}
    </div>
  );
};

export default ShowFeedbackList;
