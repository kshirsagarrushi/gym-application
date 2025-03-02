import { useNavigate } from "react-router-dom";
import Star from "../assets/icons/Star";
import Button from "./Button";
import avatar from "../assets/SignUpImage.png";

interface CoachInfoProps {
  image: string;
  name: string;
  rating: number;
  title: string;
  summary: string;
  coachId: number;
}

const CoachInfoCard: React.FC<CoachInfoProps> = ({
  image,
  name,
  rating,
  title,
  summary,
  coachId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col max-w-[19.75rem] h-[30.37rem] border rounded-xl shadow-[0_0_11px_0px_rgba(0,0,0,0.12)] font-lexend">
      <div className="h-[12.37rem]">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={image}
          alt="coach-img"
          onError={(e) => {
            const target = e.target as HTMLImageElement; // Type assertion
            target.src = avatar; // Set fallback avatar
          }}
        />
      </div>
      <div className="flex flex-col px-[1rem] py-[1.5rem] gap-[1.5rem] flex-grow">
        <div className="flex flex-col gap-[1.5rem] flex-grow">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-medium leading-6 text-[1.1rem] text-[#4B5563]">
                {name}
              </h1>
              <p className="font-light text-[0.9rem] text-[#4B5563]">{title}</p>
            </div>
            <div className="flex gap-1">
              <span className="font-light text-[0.8rem] leading-5 text-[#4B5563]">
                {rating}
              </span>
              <Star />
            </div>
          </div>
          <div className="max-h-[3.75rem] flex-grow">
            <p className="font-light text-[0.9rem] text-[#4B5563]">{summary}</p>
          </div>
        </div>
        <div className="mt-auto">
          <Button
            text={"Book Workout"}
            onSubmit={() => {
                navigate(`/coach/profile/${coachId}`);
              } 
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CoachInfoCard;
