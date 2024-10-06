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
import { fetchPokemonLists } from "../../feature/pokemon/pokemonListSlice";
import AppWraper from "../../components/AppWraper";
import { POKEMON_LIST } from "../../constant/localStoragePokemon";

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
  const [storedPokemonLists, setStoredPokemonLists] = useState<PokemonLists[]>(
    []
  );

  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.pokemonList);

  // Fetch pokemon list (for the very first time page load)
  useEffect(() => {
    if (status === "idle") {
      console.log("fetch when idle");
      dispatch(fetchPokemonLists());
    }
  }, [dispatch, status]);

  // Get local storage Pokemon list
  useEffect(() => {
    const localStoredPokemon = localStorage.getItem(POKEMON_LIST);
    // console.log("Local storage data", localStoredPokemon);

    // Check if localStoredPokemon is not null
    if (localStoredPokemon) {
      try {
        const parsedPokemonLists: PokemonLists[] =
          JSON.parse(localStoredPokemon);
        // console.log("parsed pokemon lists", parsedPokemonLists);

        // Ensure if parsedPokemonLists is an array
        if (Array.isArray(parsedPokemonLists)) {
          setStoredPokemonLists(parsedPokemonLists);
          setSortedList(parsedPokemonLists);
        } else console.log("Parsed data is not an array");
      } catch (error) {
        console.log("Error parsing local storage pokemon data", error);
      }
    } else {
      console.log("No data found in local storage");
    }
  }, []);

  // Sorting data based on user choice
  useEffect(() => {
    // Check if storedPokemonLists from local storage is not empty
    if (storedPokemonLists.length > 0) {
      const sortedPokemonLists = [...storedPokemonLists];

      if (sortOrder === "default") {
        setSortedList(sortedPokemonLists);
      } else if (sortOrder === "A-Z") {
        sortedPokemonLists.sort((a, b) => a.name.localeCompare(b.name));
        setSortedList(sortedPokemonLists);
      } else if (sortOrder === "Z-A") {
        sortedPokemonLists.sort((a, b) => b.name.localeCompare(a.name));
        setSortedList(sortedPokemonLists);
      }
    }
  }, [sortOrder, storedPokemonLists]);

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
    </AppWraper>
  );
};

export default Index;
