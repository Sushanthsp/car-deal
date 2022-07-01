import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from '../../config/firebaseinit'


export const fetchAsyncCars = createAsyncThunk(
  "cars/getcarDetails",
  async () => {
    const response = await axios.get('https://us-central1-car-deal-9915c.cloudfunctions.net/app/api/all')
    const carDetail = await response.data.filter(profile => profile.email === auth.currentUser.email)
    return carDetail
  }
);

export const postCars = createAsyncThunk(
  "cars/postCarDetails",
  async (
    carBrand, carModel, year, carRegisteredState, kilometersDriven, file, bid, imageUrl,dealersBid) => {
    const response = await axios.post('https://us-central1-car-deal-9915c.cloudfunctions.net/app/api/car', { carBrand, carModel, year, carRegisteredState, kilometersDriven, file, bid, imageUrl, dealersBid })
    return response
  }
);

const initialState = {
  cars: {},
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    // addMovies: (state, { payload }) => {
    //   state.movies = payload;
    //   },
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {}
    },
  },
  extraReducers: {
    [fetchAsyncCars.pending]: () => {
      console.log("pending");
    },
    [postCars.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncCars.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, cars: payload };
    },
    [postCars.fulfilled]: (state, { payload }) => {
      console.log("posted Successfully");
      return { ...state, cars: payload };
    },
    [fetchAsyncCars.rejected]: () => {
      console.log("rejected");
    },
    [postCars.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const {
  // addcar,
  removeSelectedMovieOrShow } = carSlice.actions;
export const getAllCars = (state) => state.cars.cars;
export default carSlice.reducer;