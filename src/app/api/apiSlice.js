import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl:
    'https://web-app-inspector-eye-backend-demo2.azurewebsites.net/api/v2/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('В функции перехвата');
  if (result?.error?.status === 401) {
    console.log('В функции ошибки');
    console.log('sending refresh token');

    const state = api.getState();
    const accessToken = state.auth.token;
    const refreshToken = state.auth.refreshToken;

    const body = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        url: 'User/refresh',
        method: 'POST',
        body,
      },
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
