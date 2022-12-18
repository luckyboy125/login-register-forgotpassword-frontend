import { toast } from "react-toastify";
import api from "services/api";
import {
  ChangeEmail,
  Credentials,
  ForgotPassword,
} from "store/modules/auth/types";

export const signup = async (credentials: Credentials) => {
  console.log("signup data type: ", credentials);

  const response = await api.signup(credentials);
  toast.success(response.data?.message);
};

export const changeemail = async (emails: ChangeEmail) => {
  console.log("change email data type: ", emails);

  const response = await api.changeemail(emails);
  toast.success(response.data?.message);
};

export const forgotpassword = async (email: ForgotPassword) => {
  console.log("forgotpassword data type: ", email);

  const response = await api.forgotpassword(email);
  toast.success(response.data?.message);
};
