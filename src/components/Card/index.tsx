import { FC } from "react";

interface PokemonList {
  name: string;
  index: number;
  idNumber: number;
  isSingleGrid: boolean;
}

const Card: FC<PokemonList> = ({ name, index, idNumber, isSingleGrid }) => {
  return (
    <div className="flex flex-col text-black items-center bg-white rounded-[8px] h-[195px] md:h-auto">
      <div className="flex items-center justify-between w-full p-[13px]">
        <span
          className={`${
            !isSingleGrid
              ? "hidden"
              : "text-[#11B047] text-[16px] font-bold leading-[12px]"
          }`}
        >
          Grass
        </span>
        <span
          className={`${
            !isSingleGrid ? "hidden" : "text-[16px] font-bold leading-[20px]"
          }`}
        >
          #{idNumber}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center mb-[15px] gap-[8px]">
        <img
          className="h-[90px] w-[90px] md:h-[174px] md:w-auto object-cover mt-[15px]"
          // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          //   index + 1
          // }.png`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            index + 1
          }.png`}
          alt={name}
        />
        <span className="text-[18px] font-bold leading-[18px]">{name}</span>
      </div>
    </div>
  );
};

export default Card;
