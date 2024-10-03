import { FC, useState } from "react";
import SingleGridIcon from "../../assets/icons/one-grid-icon.svg";
import MultiGridIcon from "../../assets/icons/multi-grid-icon.svg";

interface Navigation {
  onClick: (value: boolean) => void;
}

const Navigation: FC<Navigation> = ({ onClick }) => {
  const [isSingleGrid, setIsSingleGrid] = useState(true);

  const handleOneGridView = () => {
    setIsSingleGrid(true);
    onClick(true);
  };

  const handleMultiGridView = () => {
    setIsSingleGrid(false);
    onClick(false);
  };

  return (
    <div className="flex mx-[20px] justify-between items-center gap-[23px] mt-[20px]">
      <div className="basis-[75%]">
        <select
          className="font-[16px] p-[6px] w-full rounded-[8px]"
          id="pet-select bg-[#3D4466]"
        >
          <option className="" value="">
            Sort by
          </option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="basis-[25%] text-white flex items-center justify-center">
        {/* Single grid button */}
        <button
          onClick={handleOneGridView}
          className={`flex items-center justify-center ${
            isSingleGrid ? "bg-[#3D4466] " : "bg-[#0C1231]"
          } h-[32px] w-[35px] rounded-l-[8px] cursor-pointer`}
        >
          <img src={SingleGridIcon} alt="Single grid icon" />
        </button>

        <div className="border-[1px] border-[#97A0CC] h-[32px]" />

        {/* Multi grid button */}
        <button
          onClick={handleMultiGridView}
          className={`flex items-center justify-center ${
            isSingleGrid ? "bg-[#0C1231] " : "bg-[#3D4466]"
          } h-[32px] w-[35px] rounded-r-[8px] cursor-pointer`}
        >
          <img src={MultiGridIcon} alt="Multi grid icon" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
