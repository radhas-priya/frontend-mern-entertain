import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_KEY, TMBD_BASE_URL } from "../utils/constants";
// import { API_KEY } from "../utils/constants";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};
// https://entertainment-mern-app-smci.onrender.com
export const getGenres=createAsyncThunk("entertain/genres",async()=>{
    const {
      data : {genres},
  }=await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    return genres;
})

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};



const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    
      const { data: {results } } = await axios.get(
        `${api}${paging ? `&page=${i}` : ""}`
      );
      createArrayFromRawData(results, moviesArray, genres);
     
  }
  return moviesArray;
};



export const fetchMovies =createAsyncThunk("entertain/trending",
async({ type },thunkApi)=>{
  const {
    entertain:{genres},
  }=thunkApi.getState();
  return await  getRawData(
    `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
    genres,
    true
  );
    
},
)

export const fetchDataByGenre = createAsyncThunk(
  "entertain/moviesByGenres",
  async ({ genre, type }, thunkApi) => {
    const {
      entertain: { genres },
    } = thunkApi.getState();
    
   
     return await getRawData(
        `${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres
      );
  }
);


export const getUserLikedMovies = createAsyncThunk("entertain/getLiked",async (email)=>{
  const {data:{movies}}=await axios.get(`https://entertainment-mern-app-smci.onrender.com/api/user/liked/${email}`)
  return movies
})
// await axios.get(`http://localhost:5000/api/user/liked/${email}`)



export const removeFromLikedMovies = createAsyncThunk("entertain/deleteLiked",async ({email,movieId})=>{
  const {data:{movies}}=await axios.put(`https://entertainment-mern-app-smci.onrender.com/api/user/delete`,{email,movieId})
  return movies
})
// await axios.put(`http://localhost:5000/api/user/delete`,{email,movieId})




// Define the entertain slice
const entertainSlice = createSlice({
  name: "entertain",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(fetchDataByGenre.fulfilled,(state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(getUserLikedMovies.fulfilled,(state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(removeFromLikedMovies.fulfilled,(state, action) => {
      state.movies = action.payload;
    });

  },
});

// Configure Redux store
export const store = configureStore({
  reducer: {
    entertain: entertainSlice.reducer,
  },
});


