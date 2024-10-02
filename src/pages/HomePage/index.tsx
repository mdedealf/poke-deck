import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Card from "../../components/Card";
import usePokemonList from "../../hooks/usePokemonList";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

interface Pokemon {
  name: string;
  url: string;
}

const Index: FC = () => {
  const [isSingleGrid, setIsSingleGrid] = useState(true);
  const { loading, error } = usePokemonList();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchPokemon, setSearchPokemon] = useState("");

  useEffect(() => {
    // get pokemon data from local storage
    const storedPokemonList = localStorage.getItem("POKEMON_LIST");

    if (storedPokemonList) setPokemonList(JSON.parse(storedPokemonList));

    console.log("calling local storage data");
  }, []);
  console.log(pokemonList);

  const singleGridStyle =
    "flex flex-col h-full gap-[16px] mt-[16px] overflow-hidden mx-[20px] mb-[20px] transition-all";
  const multiGridStyle =
    "grid grid-cols-2 h-full mt-[16px] gap-[16px] mx-[20px] overflow-hidden mb-[20px] transition-all";

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Header />
      <Navigation onClick={setIsSingleGrid} />
      <section className={`${isSingleGrid ? singleGridStyle : multiGridStyle}`}>
        {pokemonList.map((pokemon, index) => (
          <Link key={pokemon.name} to={`/details/${pokemon.name}`}>
            <Card
              name={pokemon.name}
              index={index}
              key={index}
              idNumber={index + 1}
              isSingleGrid={isSingleGrid}
            />
          </Link>
        ))}
      </section>
    </>
  );
};

export default Index;
