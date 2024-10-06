import { FC } from "react";

interface PokemonList {
  name: string;
  url: string;
  id: number;
  types: string[];
  isSingleGrid: boolean;
}

const Card: FC<PokemonList> = ({ name, url, id, types, isSingleGrid }) => {
  return (
    <div className="flex flex-col text-black items-center bg-white rounded-[8px] h-[195px] md:h-auto">
      <div className="flex items-center justify-between w-full p-[13px]">
        <span
          className={`${
            !isSingleGrid
              ? "hidden"
              : "text-[#11B047] text-[16px] font-bold leading-[12px] flex items-center justify-center gap-[4px]"
          }`}
        >
          {types.map((type, index) => (
            <span key={index}>
              <span>{type}</span>
              {index < types.length - 1 && <span>,</span>}
            </span>
          ))}
        </span>
        <span
          className={`${
            !isSingleGrid ? "hidden" : "text-[16px] font-bold leading-[20px]"
          }`}
        >
          #{id}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center mb-[15px] gap-[8px]">
        <img
          className="h-[90px] w-[90px] md:h-[154px] md:w-auto object-cover mt-[15px]"
          src={url}
          alt={name}
        />
        <span className="text-[18px] font-bold leading-[18px]">{name}</span>
      </div>
    </div>
  );
};

export default Card;
