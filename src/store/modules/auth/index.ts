import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { toast } from "react-toastify";

import {
  AuthState,
  Credentials,
  ForgotPasswordVerify,
  SignupVerify,
} from "./types";
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

export const signupverify = createAsyncThunk(
  "auth/signupverify",
  async (token: SignupVerify) => {
    console.log("signup-verify data type: ", token);

    const response = await api.signupverify(token);
    await AsyncLocalStorage.setItem("token", response.data.token);
    toast.success(response.data.message);

    return response.data;
  }
);

export const forgotpasswordverify = createAsyncThunk(
  "auth/forgotpasswordverify",
  async (tokenandnewpassword: ForgotPasswordVerify) => {
    console.log("forgotpassword-verify data type: ", tokenandnewpassword);

    const response = await api.forgotpasswordverify(tokenandnewpassword);
    await AsyncLocalStorage.setItem("token", response.data.token);
    toast.success(response.data.message);

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
      .addCase(signupverify.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupverify.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signupverify.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotpasswordverify.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotpasswordverify.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(forgotpasswordverify.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
