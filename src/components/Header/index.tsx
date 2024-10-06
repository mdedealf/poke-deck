import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import PokeDeckLogo from "../../assets/images/poke-deck-logo.png";
import SearchIcon from "../../assets/icons/search-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const Header: FC = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [input, setInput] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle when user input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  // Handle when user press enter in the keyboard
  const handleSearchPokemon = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !isSearching) {
      setIsSearching(true);

      const inputLowerCase = input.toLowerCase();
      navigate(`/details/${inputLowerCase}`);

      // Custom debounce 4s
      setTimeout(() => {
        setIsSearching(false);
      }, 4000);
    }
  };

  // Handle when user click search icon
  const handleSearchIcon = () => {
    setIsSearch((prev) => !prev);
  };

  return (
    <header className="sticky top-0 flex h-[48px] bg-bg-dark-black border-b-[1px] border-[#3D4466] w-full text-white items-center justify-between px-[25px] py-[6px]">
      <Link to={"/"}>
        <img src={PokeDeckLogo} alt="Pokemon logo" />
      </Link>
      {isSearch ? (
        <div className="flex justify-center items-center gap-[12px]">
          <input
            className="border-b-[1px] border-[#3D4466] rounded-[8px] px-[14px] py-[6px] text-[14px] h-[26px] text-black"
            type="text"
            placeholder="Search..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleSearchPokemon}
            disabled={isSearching}
          />
          <span
            className="flex items-center justify-center cursor-pointer font-bold leading-[0px] text-[16px] bg-white text-black h-[22px] w-[22px] rounded-2xl hover:bg-slate-200 p-0 m-0 transition-all"
            onClick={handleSearchIcon}
          >
            x
          </span>
        </div>
      ) : (
        <>
          <img
            className="cursor-pointer"
            onClick={handleSearchIcon}
            src={SearchIcon}
            alt="Search icon"
          />
        </>
      )}
    </header>
  );
};

export default Header;
