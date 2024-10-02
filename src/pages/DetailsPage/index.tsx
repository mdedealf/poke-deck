import { FC } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import CardDetails from "../../components/CardDetails";
import usePokemonDetails from "../../hooks/usePokemonDetail";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Index: FC = () => {
  const { name } = useParams<{ name: string }>();
  const { pokemonDetails, loading, error } = usePokemonDetails(name || "");
  console.log(pokemonDetails);

  if (loading) return <Loading />;
  if (error || !pokemonDetails) return <Error />;

  return (
    <>
      <Header />
      <section>
        <CardDetails details={pokemonDetails} />
      </section>
    </>
  );
};

export default Index;
