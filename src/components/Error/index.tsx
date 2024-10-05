import { FC } from "react";
import { Link } from "react-router-dom";

interface Message {
  message: string | null | undefined;
}

const Error: FC<Message> = ({ message }) => {
  return (
    <div className="min-h-screen min-w-[430px] max-w-[430px] bg-[#252a3e] flex flex-col items-center justify-center gap-[30px]">
      <div className="text-red-500 font-bold text-[24px] ">{message}</div>
      <Link
        className="text-white text-[20px] bg-[#3D4466] px-[24px] py-[16px] rounded-[8px] font-bold"
        to="/"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Error;
