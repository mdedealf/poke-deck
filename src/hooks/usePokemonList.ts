import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  url: string;
}

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      // Check if pokemon data already exists in localStorage
      const storedPokemonList = localStorage.getItem("pokemonList");

      if (storedPokemonList) {
        // Use stored data from localStorage
        setPokemonList(JSON.parse(storedPokemonList));
        setLoading(false);
      } else {
        // If no data in localStorage, fetch from API
        try {
          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=20"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Pokémon.");
          }
          const data = await response.json();

          // Save the fetched data to localStorage
          localStorage.setItem("pokemonList", JSON.stringify(data.results));

          // Update state with fetched data
          setPokemonList(data.results);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchPokemonList();
  }, []);

  return { pokemonList, loading, error };
};

export default usePokemonList;
