import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { toast } from "react-toastify";

import { AuthState, Credentials } from "./types";
import api from "../../../services/api";

const initialState: AuthState = {
  user: {
    id: 0,
    email: "",
  },
  loading: false,
};

export const signin = createAsyncThunk(
  "auth/signin",
  async (credentials: Credentials) => {
    const response = await api.signin(credentials);
    console.log("response", response);
    toast.success(response.data.message);
    await AsyncLocalStorage.setItem("token", response.data.token);

    return response.data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials: Credentials) => {
    console.log("signup data type: ", credentials);

    const response = await api.signup(credentials);
    await AsyncLocalStorage.setItem("token", response.data.token);
    toast.success("Signed up successfully.");

    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log(" signin payload : ", action);
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
