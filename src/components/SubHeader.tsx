import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import img from "../assets/Base.png";
import { FC } from "react";

interface SubHeaderProps {
  text?: string;
}

const SubHeader: FC<SubHeaderProps> = ({ text }) => {
  const client = useSelector((state: RootState) => state.client);
  const coach = useSelector((state: RootState) => state.coach);
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <div
      className="w-full relative py-3 sm:py-4 px-2 sm:px-8 text-[#FFFFFF] font-lexend text-[1.2rem]"
      style={{ backgroundImage: `url(${img})` }}
    >
      {!text ? (
        <div>
          Hello,{" "}
          {!client.firstName && !coach.firstName && !admin.firstName
            ? "User"
            : !client.firstName && !coach.firstName
            ? `${admin.firstName} ${admin.lastName}`
            : client.firstName
            ? `${client.firstName} ${client.lastName}`
            : `${coach.firstName} ${coach.lastName}`}
        </div>
      ) : (
        text
      )}
    </div>
  );
};

export default SubHeader;
