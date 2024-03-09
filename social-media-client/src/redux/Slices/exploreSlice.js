import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";

export const getExploreData = createAsyncThunk(
    "user/getExploreData",
    async () => {
        try {
            const response = await axiosClient.get("/user/getExploreData");
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

const exploreSlice = createSlice({
    name: "exploreSlice",
    initialState: {
        exploreData: {},
    },
    extraReducers: (builder) => {
        builder.addCase(getExploreData.fulfilled, (state, action) => {
            state.exploreData = action.payload;
        });
    },
});

export default exploreSlice.reducer;
