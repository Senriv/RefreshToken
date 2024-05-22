import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'User/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: (credentials) => ({
        url: 'User/refresh',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;
