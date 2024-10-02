import { FC } from "react";
import PokeDeckLogo from "../../assets/images/poke-deck-logo.png";
import SearchIcon from "../../assets/icons/search-icon.svg";
import { Link } from "react-router-dom";

const Header: FC = () => {
  const isSearch = false;

  return (
    <header className="fixed top-0 flex h-[48px] bg-bg-dark-black border-b-[1px] border-[#3D4466] w-full text-white items-center justify-between px-[25px] py-[6px]">
      <Link to={"/"}>
        <img src={PokeDeckLogo} alt="Pokemon logo" />
      </Link>
      {isSearch ? (
        <input
          className="border-b-[1px] border-[#3D4466] rounded-[8px] px-[14px] py-[6px] text-[14px] h-[26px] text-black"
          type="text"
          placeholder="Search..."
        />
      ) : (
        <img src={SearchIcon} alt="Search icon" />
      )}
    </header>
  );
};

export default Header;
