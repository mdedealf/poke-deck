import { FC } from "react";
import { Link } from "react-router-dom";

interface Message {
  message: string | null | undefined;
}

const Error: FC<Message> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full gap-[20px]">
      <div className="text-white ">{message}</div>
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
