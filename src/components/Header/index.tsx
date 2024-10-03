import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import PokeDeckLogo from "../../assets/images/poke-deck-logo.png";
import SearchIcon from "../../assets/icons/search-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const Header: FC = () => {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const isSearch = true;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      navigate(`/details/${input}`);
    }
  };

  return (
    <header className="sticky top-0 flex h-[48px] bg-bg-dark-black border-b-[1px] border-[#3D4466] w-full text-white items-center justify-between px-[25px] py-[6px]">
      <Link to={"/"}>
        <img src={PokeDeckLogo} alt="Pokemon logo" />
      </Link>
      {isSearch ? (
        <input
          className="border-b-[1px] border-[#3D4466] rounded-[8px] px-[14px] py-[6px] text-[14px] h-[26px] text-black"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <img src={SearchIcon} alt="Search icon" />
      )}
    </header>
  );
};

export default Header;
