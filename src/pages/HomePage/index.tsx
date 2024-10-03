import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Card from "../../components/Card";
import usePokemonList from "../../hooks/usePokemonList";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {
  multiGridStyle,
  singleGridStyle,
} from "../../components/utils/layoutStyle";
import { POKEMON_LIST } from "../../constant/localStoragePokemon";

interface Pokemon {
  name: string;
  url: string;
}

const Index: FC = () => {
  const [isSingleGrid, setIsSingleGrid] = useState(true);
  const { loading, error } = usePokemonList();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    // get pokemon data from local storage
    const storedPokemonList = localStorage.getItem(POKEMON_LIST);

    if (storedPokemonList) setPokemonList(JSON.parse(storedPokemonList));
    console.log("calling local storage data");
    console.log(storedPokemonList);
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Header />
      <Navigation onClick={setIsSingleGrid} />
      <section className={`${isSingleGrid ? singleGridStyle : multiGridStyle}`}>
        <>
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
        </>
      </section>
    </>
  );
};

export default Index;
