import { FC } from "react";

interface PokemonDetailsProps {
  details: {
    name: string;
    id: number;
    health: number;
    attack: number;
    defense: number;
    spriteFront: string;
    artworkFront: string;
  };
}

const CardDetails: FC<PokemonDetailsProps> = ({ details }) => {
  return (
    <div className="flex flex-col justify-center text-white m-[24px] gap-[20px] mt-[68px]">
      <span className="text-[18px] font-[400px] leading-[24px] text-[#97A0CC]">
        #{details.id}
      </span>
      <div className="flex items-center justify-center ">
        <img
          className="h-[200px] w-[200px] object-cover"
          src={details.artworkFront}
          alt="Pokemon image"
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[36px] text-white font-bold leading-[30px]">
          {details.name}
        </span>
        <img
          className="h-[70px] w-[70px] object-cover"
          src={details.spriteFront}
          alt="Pokemon small image"
        />
      </div>
      <div className="flex flex-col items-start justify-center bg-black p-[16px] radius-[8px]">
        <div className="flex flex-col items-start justify-center gap-[8px] w-full">
          <span className="text-[16px] font-[400px] text-[#97A0CC]">
            Health
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-[#6CF0A1] h-2 rounded-full w-full"
              style={{ width: `${details.health / 10}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[8px]">
          <span className="text-[24px] font-bold">{details.health}</span>
          <span>from</span>
          <span>1000</span>
        </div>
        <div className="flex items-start w-full border-t-[1px] border-[#3D4466] mt-[10px] pt-[15px]">
          <div className="flex flex-col basis-[50%]">
            <span className="text-[16px] text-[#97A0CC]">Attack</span>
            <span className="text-[24px] font-bold">{details.attack}</span>
          </div>
          <div className="flex flex-col basis-[50%]">
            <span className="text-[16px] text-[#97A0CC]">Defense</span>
            <span className="text-[24px] font-bold">{details.defense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
