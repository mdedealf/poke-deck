import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import usePokemonDetails from "../../hooks/usePokemonDetail";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Index: FC = () => {
  const { name } = useParams<{ name: string }>();
  const { pokemonDetails, loading, error, fetchPokemonDetails } =
    usePokemonDetails();
  console.log(pokemonDetails);

  useEffect(() => {
    if (name) fetchPokemonDetails(name);
  }, [name, fetchPokemonDetails]);

  if (loading) return <Loading />;
  if (error || !pokemonDetails) return <Error message={"Pokemon not found"} />;

  return (
    <div className="min-h-screen min-w-[430px] max-w-[430px] bg-[#252a3e]">
      <Header />
      <section>
        {pokemonDetails && <CardDetails details={pokemonDetails} />}
      </section>
    </div>
  );
};

export default Index;
