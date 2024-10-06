import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  MAX_POKEMON_LISTS,
  MAX_POKEMON_PER_PAGE,
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
  async (page: number, { rejectWithValue }) => {
    // How many Data per page
    const POKEMON_PER_PAGE = MAX_POKEMON_PER_PAGE;
    // Calculate offset based on the page number
    const offset = (page - 1) * POKEMON_PER_PAGE;

    try {
      const localStoredPokemon = localStorage.getItem(
        `${POKEMON_LIST}_page_${page}`
      );

      // If there are any data for current page in local storage then use it
      if (localStoredPokemon) {
        console.log(`using data from localStorage for page ${page}`);
        return JSON.parse(localStoredPokemon) as PokemonSmallDetails[];
      }

      // Fetch data from API with pagination if no data in local storage
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`
      );

      console.log("Fetched data from API for page ${page}", data);
      const pokemonList = data.results as Pokemon[];

      // Use helper function to fetch details for each individual pokemon
      const pokemonDetailsPromises = pokemonList.map(fetchPokemonDetails);
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      // Cache the result for this page into local storage
      localStorage.setItem(
        `${POKEMON_LIST}_page_${page}`,
        JSON.stringify(pokemonDetails)
      );

      console.log(
        `data fetched from API for page ${page} and stored to localStorage`
      );

      return pokemonDetails;
    } catch (error) {
      console.log("Error fetching data", error);
      return rejectWithValue("Error fetching Pokemon data.");
    }
  }
);

interface PokemonListState {
  lists: Pokemon[];
  listsName: string[];
  currentPage: number;
  totalPage: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: PokemonListState = {
  lists: [],
  listsName: [],
  currentPage: 1,
  totalPage: Math.ceil(MAX_POKEMON_LISTS / MAX_POKEMON_PER_PAGE),
  status: "idle",
  error: null,
};

const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
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
        state.totalPage = Math.ceil(MAX_POKEMON_LISTS / MAX_POKEMON_PER_PAGE);
        state.listsName = action.payload.map((pokemon) => pokemon.name);
      })
      .addCase(fetchPokemonLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = pokemonListSlice.actions;

export default pokemonListSlice.reducer;
