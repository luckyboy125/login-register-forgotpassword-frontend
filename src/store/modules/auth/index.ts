import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { toast } from "react-toastify";

import { AuthState, Credentials, ForgotPasswordVerify, Token } from "./types";
import api from "../../../services/api";
import { storageConst } from "helpers/const.helper";

const initialState: AuthState = {
  user: {
    id: 0,
    email: "",
  },
  loading: false,
};

export const signinWithToken = createAsyncThunk(
  "auth/signintoken",
  async (token: Token) => {
    const response = await api.signinwithtoken(token);
    toast.success(response.data.message);
    await AsyncLocalStorage.setItem(storageConst, response.data.token);

    return response.data;
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (credentials: Credentials) => {
    const response = await api.signin(credentials);
    toast.success(response.data.message);
    await AsyncLocalStorage.setItem(storageConst, response.data.token);

    return response.data;
  }
);

export const signupverify = createAsyncThunk(
  "auth/signupverify",
  async (token: Token) => {
    const response = await api.signupverify(token);
    await AsyncLocalStorage.setItem(storageConst, response.data.token);
    toast.success(response.data.message);

    return response.data;
  }
);

export const forgotpasswordverify = createAsyncThunk(
  "auth/forgotpasswordverify",
  async (tokenandnewpassword: ForgotPasswordVerify) => {
    const response = await api.forgotpasswordverify(tokenandnewpassword);
    await AsyncLocalStorage.setItem(storageConst, response.data.token);
    toast.success(response.data.message);

    return response.data;
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  const response = await api.signout();
  await AsyncLocalStorage.removeItem(storageConst);
  toast.success(response.data.message);

  return initialState;
});

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
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signinWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinWithToken.fulfilled, (state, action) => {
        state.loading = false;
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(signinWithToken.rejected, (state) => {
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
