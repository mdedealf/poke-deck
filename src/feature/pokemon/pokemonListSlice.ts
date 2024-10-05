import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { POKEMON_LIST } from "../../constant/localStoragePokemon";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonName {
  name: string;
}

// Action : fetching pokemon lists
export const fetchPokemonLists = createAsyncThunk(
  "pokemonList/fetchPokemonLists",
  async () => {
    const localStoredPokemon = localStorage.getItem(POKEMON_LIST);

    // check if there are any data in local storage then use it
    if (localStoredPokemon) {
      // console.log for debugging only "will delete later"
      console.log("using data from localStorage");
      return JSON.parse(localStoredPokemon) as Pokemon[];
    }

    // check if there are no any data in local storage then fetch
    const { data, status } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    if (status !== 200) throw new Error("Failed to fetch Pokemon lists");

    const pokemonList = data.results as Pokemon[];
    localStorage.setItem(POKEMON_LIST, JSON.stringify(pokemonList));
    // console.log for debugging only "will delete later"
    console.log("data fetched from API and stored to localStorage");

    return pokemonList;
  }
);

interface PokemonListState {
  lists: Pokemon[];
  listsName: PokemonName[];
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
      .addCase(fetchPokemonLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchPokemonLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pokemonListSlice.reducer;
