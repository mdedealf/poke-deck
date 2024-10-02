import { FC } from "react";
import { Link } from "react-router-dom";

const Error: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-[20px]">
      <div className="text-white ">Unable to load data</div>
      <Link
        className="text-white bg-[#3D4466] px-[24px] py-[16px] rounded-[8px] font-bold"
        to="/"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Error;
