import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {
  multiGridStyle,
  singleGridStyle,
} from "../../components/utils/layoutStyle";
import { useAppDispatch, useAppSelector } from "../../hooks/useSelector";
import {
  fetchPokemonLists,
  setCurrentPage,
} from "../../feature/pokemon/pokemonListSlice";
import AppWraper from "../../components/AppWraper";
import { POKEMON_LIST } from "../../constant/pokemonConstant";

type PokemonLists = {
  name: string;
  artworkFront: string;
  id: number;
  types: string[];
};

const Index: FC = () => {
  const [isSingleGrid, setIsSingleGrid] = useState<boolean>(true);
  useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [sortedList, setSortedList] = useState<PokemonLists[]>([]);
  const dispatch = useAppDispatch();
  const { totalPage, currentPage, error, status } = useAppSelector(
    (state) => state.pokemonList
  );

  // Fetch pokemon for current page (initial load or page changes)
  useEffect(() => {
    const localStoredPokemon = localStorage.getItem(
      `${POKEMON_LIST}_page_${currentPage}`
    );
    console.log("Get items", localStoredPokemon);

    // If local storage has any data, set it to state
    if (localStoredPokemon) {
      try {
        const parsedPokemonLists: PokemonLists[] =
          JSON.parse(localStoredPokemon);

        // Ensure if parsedPokemonLists is an array
        if (Array.isArray(parsedPokemonLists)) {
          setSortedList(parsedPokemonLists);
          console.log("Loaded data from local storage for page", currentPage);
        } else console.log("Parsed data is not an array");
      } catch (error) {
        console.log("Error parsing local storage pokemon data", error);
      }
    } else {
      // If no data found in local storage, then fetch data
      console.log(
        "No data found in local storage, fetching from API for page",
        currentPage
      );
      dispatch(fetchPokemonLists(currentPage)).then(() => {
        // After fetching, update the state with the new data
        const updatedStoredPokemon = localStorage.getItem(
          `${POKEMON_LIST}_page_${currentPage}`
        );
        if (updatedStoredPokemon) {
          setSortedList(JSON.parse(updatedStoredPokemon));
        }
      });
    }
  }, [dispatch, currentPage]);

  // Store data in local storage after fetching data
  useEffect(() => {
    if (status === "succeeded" && sortedList.length > 0) {
      localStorage.setItem(
        `${POKEMON_LIST}_page_${currentPage}`,
        JSON.stringify(sortedList)
      );
      console.log("Stored data in local storage for page", currentPage);
    }
  }, [status, sortedList, currentPage]);

  // Sorting data based on user choice
  useEffect(() => {
    if (sortedList.length > 0) {
      const sortedPokemonLists = [...sortedList];
      let newSortedList: PokemonLists[] = [];

      if (sortOrder === "default") {
        newSortedList = sortedPokemonLists;
      } else if (sortOrder === "A-Z") {
        newSortedList = sortedPokemonLists.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (sortOrder === "Z-A") {
        newSortedList = sortedPokemonLists.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      if (JSON.stringify(newSortedList) !== JSON.stringify(sortedList))
        setSortedList(newSortedList);
    }
  }, [sortOrder, sortedList]);

  const handlePreviousPage = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      dispatch(setCurrentPage(currentPage + 1));

      dispatch(fetchPokemonLists(currentPage + 1));
    }
  };

  return (
    <AppWraper>
      <Header />
      <Navigation
        onClick={setIsSingleGrid}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <section className={`${isSingleGrid ? singleGridStyle : multiGridStyle}`}>
        <>
          {status === "loading" && <Loading />}
          {status === "failed" && <Error message={error} />}
          {status === "succeeded" &&
            sortedList.map((pokemon, index) => (
              <Link key={pokemon.name} to={`/details/${pokemon.name}`}>
                <Card
                  name={pokemon.name}
                  url={pokemon.artworkFront}
                  types={pokemon.types}
                  key={index}
                  id={pokemon.id}
                  isSingleGrid={isSingleGrid}
                />
              </Link>
            ))}
        </>
      </section>
      <div className="fixed bottom-0 flex items-center justify-center min-w-[430px] max-w-[430px] gap-[10px] bg-bg-dark-black h-[50px]">
        <button
          className={`bg-white text-black py-[2px] px-[12px] rounded-[4px] font-bold ${
            currentPage === 1 ? "opacity-50" : ""
          } `}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={`bg-white text-black py-[2px] px-[12px] rounded-[4px] font-bold ${
            currentPage === totalPage ? "opacity-50" : ""
          } `}
          onClick={handleNextPage}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </AppWraper>
  );
};

export default Index;
