import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="h-[calc(100vh-98px)] min-w-[430px] max-w-[430px] bg-[#252a3e] text-white font-bold text-[24px] flex items-center justify-center">
      Loading...
    </div>
  );
};

export default Loading;
