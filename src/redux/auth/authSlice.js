import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { userCredentials, accessToken, refreshToken } = action.payload;
      state.user = userCredentials;
      state.token = accessToken;
      state.refreshToken = refreshToken;

      localStorage.setItem('user', JSON.stringify(userCredentials));
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;