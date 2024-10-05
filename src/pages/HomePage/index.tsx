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

const Index: FC = () => {
  const [isSingleGrid, setIsSingleGrid] = useState(true);

  const dispatch = useAppDispatch();
  const { lists, error, status } = useAppSelector((state) => state.pokemonList);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemonLists());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen min-w-[400px] max-w-[430px] bg-[#252a3e]">
      <Header />
      <Navigation onClick={setIsSingleGrid} />
      <section className={`${isSingleGrid ? singleGridStyle : multiGridStyle}`}>
        <>
          {status === "loading" && <Loading />}
          {status === "failed" && <Error message={error} />}
          {status === "succeeded" &&
            lists.map((pokemon, index) => (
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
    </div>
  );
};

export default Index;
