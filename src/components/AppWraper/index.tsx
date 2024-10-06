import { ReactNode } from "react";

type AppWraperProp = {
  children: ReactNode;
};

const AppWraper = ({ children }: AppWraperProp) => {
  return (
    <main className="relative min-h-screen min-w-[430px] max-w-[430px] bg-[#252a3e]">
      {children}
    </main>
  );
};

export default AppWraper;
