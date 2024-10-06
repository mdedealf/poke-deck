import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  MAX_POKEMON_LISTS,
  POKEMON_LIST,
} from "../../constant/localStoragePokemon";

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

interface PokemonSmallDetails {
  name: string;
  id: number;
  artworkFront: string;
  types: string[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Helper: Get pokemon detail
const fetchPokemonDetails = async (
  pokemon: Pokemon
): Promise<PokemonSmallDetails> => {
  const pokemonDetailResponse = await axios.get(pokemon.url);
  const details = pokemonDetailResponse.data;

  return {
    name: details.name,
    id: details.id,
    artworkFront: details.sprites.other["official-artwork"].front_default,
    types: details.types.map((typeInfo: PokemonType) => typeInfo.type.name),
  };
};

// Action : fetching pokemon lists
export const fetchPokemonLists = createAsyncThunk(
  "pokemonList/fetchPokemonLists",
  async () => {
    try {
      const localStoredPokemon = localStorage.getItem(POKEMON_LIST);
      const FETCH_LIST_AMOUNT = MAX_POKEMON_LISTS - 1062;

      // check if there are any data in local storage then use it
      if (localStoredPokemon) {
        console.log("using data from localStorage");
        return JSON.parse(localStoredPokemon) as Pokemon[];
      }

      // Fetch if no data in local storage
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIST_AMOUNT}`
      );
      const pokemonList = data.results as Pokemon[];

      // Use helper function to fetch details for each pokemon
      const pokemonDetailsPromises = pokemonList.map(fetchPokemonDetails);
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      // Save data into local storage
      localStorage.setItem(POKEMON_LIST, JSON.stringify(pokemonDetails));
      console.log("data fetched from API and stored to localStorage");

      return pokemonDetails as PokemonSmallDetails[];
    } catch (error) {
      throw new Error("Error fetching Pokemon data.");
    }
  }
);

interface PokemonListState {
  lists: Pokemon[];
  listsName: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: PokemonListState = {
  lists: [],
  listsName: [],
  status: "idle",
  error: null,
};

const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PokemonListState>) => {
    builder

      // Fetch Pokemon Lists
      .addCase(fetchPokemonLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonLists.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.lists = action.payload.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        }));

        state.listsName = action.payload.map((pokemon) => pokemon.name);
      })
      .addCase(fetchPokemonLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pokemonListSlice.reducer;
