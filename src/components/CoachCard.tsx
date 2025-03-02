import { FC } from "react";
import avatar from "../assets/Avatar.png";
import CalenderIcon from "../assets/icons/CalenderIcon";
import Clock from "../assets/icons/Clock";
import Dumbell from "../assets/icons/Dumbell";
import Star from "../assets/icons/Star";
import Button from "./Button";
import formatDateTime from "../helpers/formatDate";
import { useNavigate } from "react-router-dom";

interface CoachCardInterface {
  name: string;
  title: string;
  rating: string;
  type: string;
  time: string;
  date: string;
  summary: string;
  timeArr: string[];
  coachId: string;
  profilePicture?: string;
  onSubmit: () => void;
}

const CoachCard: FC<CoachCardInterface> = ({
  name,
  title,
  rating,
  type,
  time,
  date,
  timeArr,
  summary,
  onSubmit,
  coachId,
  profilePicture,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full rounded-[16px] py-5 px-3 font-lexend flex flex-col justify-between"
      style={{ boxShadow: "1px 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex justify-between">
        <div className="flex gap-3">
          <img
            src={profilePicture || avatar}
            className="w-[4.5rem] h-[4.5rem] rounded-full object-cover"
            alt={"Profile Picture"}
            onError={(e) => {
              const target = e.target as HTMLImageElement; // Type assertion
              target.src = avatar; // Set fallback avatar
            }}
          />
          <div className="text-[#4B5563] flex flex-col justify-between max-h-[4.5rem]">
            <div>
              <div className=" font-semibold text-[0.95rem]">{name}</div>
              <div className=" font-light text-[0.75rem]">{title}</div>
            </div>
            <div className="flex gap-1 font-light text-[0.8rem]">
              {rating}
              <Star />
            </div>
          </div>
        </div>
        <div className="min-w-[8rem] md:min-w-[10rem] 2xl:min-w-[12rem]">
          <div className=" relative border-[1.8px] border-[#9EF300] rounded-md p-3">
            <label className="absolute left-2 -top-2.5 px-2 font-light text-[0.7rem] bg-white text-[#4B5563]">
              Booking details
            </label>
            <div className="text-[0.7rem]">
              <div className="flex gap-2 text-[#4B5563] font-light">
                <Dumbell /> <span className=" font-semibold">Type:</span>
                {type}
              </div>
              <div className="flex gap-2 text-[#4B5563] font-light">
                <Clock />
                <span className=" font-semibold">Time:</span>
                {time}
              </div>
              <div className="flex gap-2 text-[#4B5563] font-light">
                <CalenderIcon /> <span className=" font-semibold">Date:</span>
                {formatDateTime(date)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 space-y-3 text-[0.8rem] flex-1">
        <div className="text-[#4B5563] font-light">{summary}</div>
        <div className="text-[#323232] font-normal">
          Also available for this date:
        </div>
        <div className="flex gap-2 max-w-full flex-wrap">
          {timeArr.map((item, index) => (
            <div
              key={index}
              className="bg-[#F6FFE5] px-2 py-1 rounded-[2px] w-max font-[350] text-[#4B5563]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-1/2">
          <Button
            text="Coach Profile"
            backroundColor="transparent"
            onSubmit={() => navigate(`/coach/profile/${coachId}`)}
            border={true}
          />
        </div>
        <div className="w-1/2">
          <Button text="Book Workout" onSubmit={() => onSubmit()} bold={true} />
        </div>
      </div>
    </div>
  );
};

export default CoachCard;
