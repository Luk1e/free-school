import registerSlice from "./registerSlice";
import loginSlice from "./loginSlice";
import authSlice from "./authSlice";

export const authReducers = {
  register: registerSlice,
  login: loginSlice,
  authentication: authSlice,
};
